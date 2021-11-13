import Airtable from "airtable";
import dotenv from 'dotenv';
import sleep from "./functions/sleep.js";
import company_info from "./functions/company_info.js";
import {transporter} from "./functions/mail.js";
import assert from "assert";

dotenv.config();
const max = 30;
const min = 5;
let pag = 1;
let total_processed = 0;

const base = new Airtable({apiKey: process.env.APY_KEY}).base(process.env.BASE_ID);

// If you only want the first page of records, you can
// use `firstPage` instead of `eachPage`.
await base('co-founders').select({
  view: "Grid view",
  pageSize: 100
}).eachPage(async function page(records, fetchNextPage) {
  let i = 0;
  for (const record of records) {
    if (record.get('description') === undefined && pag > 44) {
      const time = (Math.random() * (max - min) + min).toFixed();
      console.log('Update %s from %s in %d seconds', record.get('fullName'),  record.get('companyName'), time);
      await sleep(time * 1000);

      const company = await company_info(String(record.get('companyId'))).catch((err) => console.error(err));

      if (company.type === 'max-redirect') {
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
      else if (company.description !== undefined) {

        const promise = base('co-founders').update([
          {
            "id": record.getId(),
            "fields": {
              "vmid": record.get('vmid'),
              "profileUrl": record.get('profileUrl'),
              "linkedInProfileUrl": record.get('linkedInProfileUrl'),
              "firstName": record.get('firstName'),
              "lastName": record.get('lastName'),
              "fullName": record.get('fullName'),
              "title": record.get('title'),
              "location": record.get('location'),
              "profileImageUrl": record.get('profileImageUrl'),
              "country": record.get('country'),
              "city": record.get('city'),
              "month": record.get('month'),
              "year": record.get('year'),
              "companyId": record.get('companyId'),
              "companyUrl": record.get('companyUrl'),
              "websiteUrl": record.get('websiteUrl'),
              "companyName": record.get('companyName'),
              "industry": record.get('industry'),
              "companyImageUrl": record.get('companyImageUrl'),
              "timestamp": record.get('timestamp'),
              "description": company.description
            }
          }
        ]);
        assert.ok(promise instanceof Promise);

        await promise.then(async function (doc) {
          console.log(record.get("fullName"), "updated...");
        });
        await promise.catch(async (err) => console.log(err));
      }
    }
    i++;
    console.log("Processed", i, "/", records.length, "total:", i + total_processed, "page:", pag);
    total_processed++;
  }
  pag++;
  fetchNextPage();
}, function done(err) {
  if (err) { console.error(err); }
});
