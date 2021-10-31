import Airtable from "airtable";
import assert from "assert";
import mongoose from 'mongoose';
import co_founders_search from "./functions/co_founders_search.js";
import company_info from "./functions/company_info.js";
import sleep from "./functions/sleep.js";
import dotenv from 'dotenv';
import {transporter} from "./functions/mail.js";

const binGeoList = [];
const max = 30;
const min = 5;


if (process.argv.length < 3) {
  console.log("Usage: node [NODE_SCRIPT] [binGeo id] ...");
  process.exit(1);
}

dotenv.config();
const base = new Airtable({apiKey: process.env.APY_KEY}).base(process.env.BASE_ID);

// save binGeo Ids in a list
for (let i = 2; process.argv[i]; i++) {
  binGeoList.push(process.argv[i]);
}
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connection successfully!");

    // Define default schema
    const FounderSchema = mongoose.Schema(
      {},
      { strict: false }
    );

    // Compile schema to model
    const Cof = mongoose.model('Co-Founders', FounderSchema, 'co-founders');
    for (let i = 0; binGeoList[i]; i++) {
      let profile_list = [];
      let success = 0;
      let ignored = 0;

      profile_list = await co_founders_search(profile_list, binGeoList[i], 0)
        .catch((err) => { return err });
      if (profile_list.type === 'max-redirect') {
        console.log("Max redirect reached - change profile header fetch info.");
        let info = await transporter.sendMail({
          from: '"Founder Scout" <2617@holbertonschool.com>', // sender address
          to: "2617@holbertonschool.com", // list of receivers
          subject: "Founder Scout - max redirections present in co-founders search function", // Subject line
          text: "There are the new co-founder profiles from LinkedIn", // plain text body
          html: `<h1 style="background-color: #000000; color: #ffffff; text-align: center; padding: 0.3rem;">
                   Max redirections in co_founders_search function
                 </h1>
                 <p>You must change the header information in the fetch function. Then restart the process with PM2 on the server.</p>      
                `, // html body
        });
        console.log(info);
        process.exit(1);
      }
      else if (profile_list.type !== undefined) {
        console.log("Error fetching data: %s", profile_list.type);
        continue;
      }

      for (let j = 0; profile_list[j]; j++) {
        try {
          const companyId = profile_list[j].companyId;
          const vmid = profile_list[j].vmid;
          let all_cof_info = { "profileInfo": {}, "companyInfo": { location: {}, createdAt: {} } };
          const time = (Math.random() * (max - min) + min).toFixed();

          if (companyId !== undefined) {
            const promise = Cof.findOne({ "profileInfo.vmid": vmid }).exec();
            assert.ok(promise instanceof Promise);
            await promise.then(async function (cof) {
              if (cof === null) {
                console.log('---> Scraping company information of %s in %d seconds... ', profile_list[j].fullname, time);
                await sleep(time * 1000);
                const companyInfo = await company_info(companyId).catch((err) => { return err });
                if (companyInfo.type !== 'max-redirect') {
                  const airtable_dict = {fields:{}};
                  const airtable_list = [];
                  // filling in profile info
                  airtable_dict.fields.vmid = all_cof_info.profileInfo.vmid = vmid;
                  airtable_dict.fields.profileUrl = all_cof_info.profileInfo.profileUrl = profile_list[j].profileUrl;
                  airtable_dict.fields.linkedInProfileUrl = all_cof_info.profileInfo.linkedInProfileUrl = profile_list[j].linkedInProfileUrl;
                  airtable_dict.fields.firstName = all_cof_info.profileInfo.firstName = profile_list[j].firstName.trim();
                  airtable_dict.fields.lastName = all_cof_info.profileInfo.lastName = profile_list[j].lastName.trim();
                  airtable_dict.fields.fullName = all_cof_info.profileInfo.fullName = profile_list[j].fullname.trim();
                  airtable_dict.fields.title = all_cof_info.profileInfo.title = profile_list[j].title;
                  airtable_dict.fields.location = all_cof_info.profileInfo.location = profile_list[j].location;
                  airtable_dict.fields.isPremium = all_cof_info.profileInfo.isPremium= profile_list[j].premium;
                  airtable_dict.fields.profileImageUrl = all_cof_info.profileInfo.profileImageUrl = profile_list[j].profileImageUrl;
                  // filling in company info
                  airtable_dict.fields.companyId = all_cof_info.companyInfo.companyId = profile_list[j].companyId;
                  airtable_dict.fields.companyUrl = all_cof_info.companyInfo.companyUrl= profile_list[j].companyUrl;
                  if (companyInfo.website !== undefined) {
                    airtable_dict.fields.websiteUrl = all_cof_info.companyInfo.websiteUrl = companyInfo.website;
                  }
                  airtable_dict.fields.companyName = all_cof_info.companyInfo.companyName = profile_list[j].companyName;
                  airtable_dict.fields.industry = all_cof_info.companyInfo.industry = profile_list[j].industry || companyInfo.industry;
                  if (companyInfo.headquarters !== undefined) {
                    airtable_dict.fields.country = all_cof_info.companyInfo.location.country = companyInfo.headquarters.country;
                    airtable_dict.fields.city = all_cof_info.companyInfo.location.city = companyInfo.headquarters.city;
                  }
                  airtable_dict.fields.month = all_cof_info.companyInfo.createdAt.month = profile_list[j].month;
                  airtable_dict.fields.year = all_cof_info.companyInfo.createdAt.year = profile_list[j].year;
                  if (companyInfo.companyPictureDisplayImage !== undefined) {
                    airtable_dict.fields.companyImageUrl = all_cof_info.companyInfo.companyImageUrl = companyInfo.companyPictureDisplayImage.rootUrl +
                      companyInfo.companyPictureDisplayImage.artifacts[0].fileIdentifyingUrlPathSegment;
                  }
                  all_cof_info.companyInfo.summary = profile_list[i].summary;
                  airtable_dict.fields.timestamp = all_cof_info.companyInfo.timestamp = new Date().toISOString();

                  // Parse to Int company info for Airtable
                  airtable_dict.fields.companyId = parseInt(airtable_dict.fields.companyId);
                  // Parse to date with only YYYY-MM-DD for Airtable
                  airtable_dict.fields.timestamp = airtable_dict.fields.timestamp.substr(0,10);

                  // save profile in Airtable
                  airtable_list.push(airtable_dict);
                  await base('co-founders')
                    .create(airtable_list)
                    .then(async (record) => console.log(":D - %s from %s saved in Airtable.", profile_list[j].fullname, profile_list[j].companyName))
                    .catch(async (err) => console.log("X( - Error saving profile in Airtable:\n", err.message));

                  // save profile in MongoDB Atlas
                  const co_founder = new Cof(all_cof_info);
                  const promise = co_founder.save();
                  assert.ok(promise instanceof Promise);

                  await promise.then(async function (doc) {
                    console.log(":D - %s from %s saved in the co-founders collection.", profile_list[j].fullname, profile_list[j].companyName);
                    success++;
                  });
                  await promise.catch(async (err) => console.log(err));
                }
                else {
                  console.log("Max redirect reached - change company header fetch info");
                  let info = await transporter.sendMail({
                    from: '"Founder Scout" <2617@holbertonschool.com>', // sender address
                    to: "2617@holbertonschool.com", // list of receivers
                    subject: "Founder Scout - max redirections present in company function", // Subject line
                    text: "There are the new co-founder profiles from LinkedIn", // plain text body
                    html: `<h1 style="background-color: #000000; color: #ffffff; text-align: center; padding: 0.3rem;">
                             Max redirections in company_info function
                           </h1>
                           <p>You must change the header information in the fetch function. Then restart the process with PM2 on the server.</p>      
                          `, // html body
                  });
                  console.log(info);
                  process.exit(1);
                }
              }
              else {
                console.log(":| - %s from %s already exists in the collection. Ignored.", profile_list[j].fullname, profile_list[j].companyName);
                ignored++;
              }
            });
          }
          else {
            console.log(":( - %s from %s doesn't have companyId. Ignored.", profile_list[j].fullname, profile_list[j].companyName);
            ignored++;
          }
        }
        catch (exe) {
          console.error("X( - failed processing company information %s from %s. Ignored.", profile_list[j].fullname, profile_list[j].companyName)
          console.error(exe);
        }
        console.log("* Profiles processed: %d/%d saved: %d ignored: %d", j + 1, profile_list.length, success, ignored);
      }
    }
    mongoose.disconnect().then(() => console.log("Connection Closed"));
  })
  .catch((err) => console.log("Connection failed!\n", err));
