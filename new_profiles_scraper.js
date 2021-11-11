import Airtable from "airtable";
import dotenv from 'dotenv';
import sleep from "./functions/sleep.js";
import company_info from "./functions/company_info.js";
import assert from "assert";
import mongoose from "mongoose";
import people_search from "./functions/people_search.js";
import max_redirection_email from "./functions/max_redirections_email.js";
import create_mdb_profile from "./functions/create_mdb_profile.js";
import create_atb_profile from "./functions/create_atb_profile.js";

// Load environment variables
dotenv.config();

// Connect co-founders base from Airtable
const base = new Airtable({apiKey: process.env.APY_KEY}).base(process.env.BASE_ID);

// Connect with Mongodb Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connection Mongodb Atlas successfully!");

    // Define default schema
    const FounderSchema = mongoose.Schema(
      {},
      { strict: false }
    );

    // Compile schema to model
    const Cof = mongoose.model('Co-Founders', FounderSchema, 'co-founders');

    let start = 0;
    let success = 0;
    let ignored = 0;
    let total = 0;
    const min = 5;
    const max = 30;
    let peopleList = [];
    let time = (Math.random() * (max - min) + min).toFixed();

    // Iterate in filter people search pages
    do {
      if (start > 0) {
        time = (Math.random() * (max - min) + min).toFixed();
        console.log('*--> Scraping next profiles page in ' + time + ' seconds... ');
        await sleep(time * 1000);
      }
      peopleList = await people_search(start);

      // Validate possible fetching errors
      if (peopleList.type === 'max-redirect') {
        console.log("Max redirect reached - change people_search header fetch info");
        await max_redirection_email('people_search');
        process.exit(1);
      }
      else if (peopleList.status > 399) {
        console.log("Error fetching people data: status ", peopleList.status)
        process.exit(1);
      }

      // Iterate profiles from people search list
      for (let person of peopleList.elements) {
        try {
          const companyId = String(person.currentPositions[0].companyUrn).split(':')[3];
          const vmid = String(person.entityUrn).split(/[(),]+/)[1];

          // Validate if the profile has companyId
          if (companyId !== undefined) {

            // Mongoose query - select unique profile by vmid
            const promise = Cof.findOne({"profileInfo.vmid": vmid}).exec();
            assert.ok(promise instanceof Promise);
            await promise.then(async function (cof) {

              // Validate if current profile exists in Mongodb Cluster
              if (cof === null) {
                time = (Math.random() * (max - min) + min).toFixed();
                console.log(' --> Scraping company information of %s in %d seconds... ', person.fullName, time);
                await sleep(time * 1000);

                const company = await company_info(companyId);

                // Validate possible fetching errors
                if (company.type === 'max-redirect') {
                  await max_redirection_email('company_info');
                  console.log("Max redirect reached - change company header fetch info");
                  process.exit(1);
                } else if (company.status > 399) {
                  console.log("Error fetching company data: status ", peopleList.status)
                  process.exit(1);
                }

                // Create dictionary to Mongodb
                const profileDict = await create_mdb_profile(person, company);
                // Create list with dictionary to Airtable
                const airtableList = await create_atb_profile(profileDict);

                // Save profile in Airtable
                await base('co-founders')
                  .create(airtableList)
                  .then(async () => console.log(":D - %s from %s saved in co-founders Airtable base.", person.fullName, person.currentPositions[0].companyName))
                  .catch(async (err) => console.log("X( - Error saving co-founders profile in Airtable base:\n", err.message));

                // Save profile in MongoDB Atlas
                const co_founder = new Cof(profileDict);
                const promise = co_founder.save();
                assert.ok(promise instanceof Promise);
                await promise.then(async function (doc) {
                  console.log(":D - %s from %s saved in the co-founders Mongodb collection.", person.fullName, person.currentPositions[0].companyName);
                  success++;
                });
                await promise.catch(async (err) => console.log(err));

              } else {
                console.log(":| - %s from %s already exists in the collection. Ignored.", person.fullName, person.currentPositions[0].companyName);
                ignored++;
              }
            });
          } else {
            console.log(":( - %s from %s doesn't have companyId. Ignored.", person.fullName, person.currentPositions[0].companyName);
            ignored++;
          }
          total++;
          console.log("* Profiles processed: %d/%d saved: %d ignored: %d", total, peopleList.paging.total, success, ignored);
        }
        catch (exe) {
          console.error("X( - failed processing company information %s from %s. Ignored.", person.fullName, person.currentPositions[0].companyName)
          console.error(exe);
          ignored++;
        }
      }
      start += 100;
    } while (start < peopleList.paging.total);

    mongoose.disconnect().then(() => console.log("Connection Mongodb Atlas Closed"));
  })
  .catch((err) => console.log("x( - Scraping process failed!\n", err));
