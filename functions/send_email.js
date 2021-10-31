import { transporter } from "./mail.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import assert from "assert";

dotenv.config();
// make a connection
export default mongoose.connect(process.env.MONGODB_URI).then(function () {
    console.log("connection successfully");

    const FounderSchema = mongoose.Schema(
      {},
      {strict: false}
    );
    // compile schema to mode
    const Cof = mongoose.model('Co-Founders', FounderSchema, 'co-founders');

    const promise = Cof.find({"companyInfo.timestamp": {
            "$gte": new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1, new Date().getHours() + 9).toISOString(),
            "$lt": new Date().toISOString()
        }}).exec();
    assert.ok(promise instanceof Promise);

    promise.then(async function (cof) {
        if (cof === null || cof.length === 0) {
            console.log("0 profiles founded...");
        }
        else {
            console.log('Co-founders successfully selected!');
            const airtableUrl = "https://airtable.com/app6XkjhTDEvcz4RH/tbli1kWxz44O9dqxz/viwm7xXruKg96K79W?blocks=hide";
            try {
                let arrayItems = "";
                let n;
                const nbsp = "&nbsp;"
                for (n in cof) {

                    let title = '';
                    let commaSpace = '';
                    let visitWebsite = '';
                    let webUrl = '';
                    let companyLocation = '';

                    if (cof.length === 1) {
                        title = `<h1 style="background-color: #000000; color: #ffffff; text-align: center">${cof.length} profile was added from yesterday</h1>`;
                    }
                    else {
                        title = `<h1 style="background-color: #000000; color: #ffffff; text-align: center">${cof.length} profiles were added from yesterday</h1>`;
                    }
                    if (cof[n].get("companyInfo.location") !== undefined) {
                        companyLocation = "Company location:";
                    }
                    if (cof[n].get("companyInfo.location.city") !== undefined && cof[n].get("companyInfo.location.country") !== undefined) {
                        commaSpace = ', ';
                    }
                    if (cof[n].get("companyInfo.websiteUrl") !== undefined) {
                        visitWebsite = 'Visit Website';
                        webUrl = `<a style="border-radius: 0.25rem; padding: 0.37rem 0.8rem; text-decoration: none; color: #ffffff; background-color: #000000;" href="${cof[n].get("companyInfo.websiteUrl")}">${visitWebsite}</a>`
                    }
                    arrayItems += `<div class="element" style="background-color: #e9e9e9; min-width: 30rem; max-width: 30rem; min-height: 6em; padding: 1%; display: flex; margin: 3% 0 3% 0; border-radius: 0.2rem; border-style: groove;">
                                      <div class="profile-img" style="background-image: url(${cof[n].get('profileInfo.profileImageUrl')}), url('https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'); width: 25%; background-size: contain; background-repeat: no-repeat; border-radius: 0.2rem;"></div>
                                      <div class="profile-info" style="width: 100%;">
                                          <p class="profile-name" style="text-align: start; margin: 0 0.5rem; font-size: 0.7rem; font-family: Tahoma, Verdana, sans-serif;">
                                              <strong>Profile name: </strong>
                                              <a style="text-decoration: none; color: #4e5eff;" href="${cof[n].get("profileInfo.linkedInProfileUrl")}"> ${cof[n].get("profileInfo.fullName")}</a>
                                          </p>
                                          <p class="company-name" style="text-align: start; margin: 0 0.5rem; font-size: 0.7rem; font-family: Tahoma, Verdana, sans-serif;">
                                              <strong>Company name: </strong>
                                              <a style="text-decoration: none; color: #4e5eff;" href="${cof[n].get("companyInfo.companyUrl")}">${cof[n].get("companyInfo.companyName") || nbsp}</a> 
                                          </p>
                                          <p class="country-city" style="text-align: start; margin: 0 0.5rem; font-size: 0.7rem; font-family: Tahoma, Verdana, sans-serif;">
                                              <strong>${companyLocation}</strong>
                                              ${cof[n].get("companyInfo.location.city") || nbsp}${commaSpace} ${cof[n].get("companyInfo.location.country") || nbsp}
                                          </p>
                                          <p class="website" style="margin: 1rem 0.5rem 0 0.5rem; font-size: 0.7rem; text-align: center; font-family: Tahoma, Verdana, sans-serif;">
                                              ${webUrl}
                                          </p>
                                      </div>
                                      <div class="company-img" style="background-image: url(${cof[n].get('companyInfo.companyImageUrl')}), url('https://png.pngitem.com/pimgs/s/463-4638878_apartment-icon-real-estate-icons-png-transparent-png.png'); width: 25%; background-size: contain; background-repeat: no-repeat; border-radius: 0.2rem;"></div>
                                   </div>`;
                }
                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: '"Founder Scout" <2617@holbertonschool.com>', // sender address
                    to: "2617@holbertonschool.com, 2160@holbertonschool.com, andres.barreto@techstars.com", // list of receivers
                    subject: "Founder Scout - new LinkedIn profiles were added", // Subject line
                    text: "There are the new co-founder profiles from LinkedIn", // plain text body
                    html: `<h1 style="background-color: #000000; color: #ffffff; text-align: center; padding: 0.3rem;">${cof.length} profiles were added from yesterday</h1>
                           <p style="text-align: center; font-family: Verdana, sans-serif;">
                              To view the list of existing profiles visit our Airtable spreadsheet. If you don't have access, please contact the administrator.
                           </p>
                           <p style="text-align: center; font-family: Verdana, sans-serif;">
                              <a style="border-radius: 0.3rem; padding: 0.6rem 2rem; font-size: 1rem; text-decoration: none; color: #ffffff; background-color: #000000;" href="${airtableUrl}">Airtable Base</a>
                           </p>
                           <div class="container" align="center" style="margin-top: 1.5rem;">
                               ${arrayItems}      
                           </div>         
                           <div class="footer" style="display: flex; align-items: center; background-color: #000000;">
                              <div align="center" class="holbie-logo" style="width: 30%; min-height: 3rem;">
                                <img class="holbie-img" style="min-width: 3rem; max-width: 7rem; padding-top: 0.3rem;" alt="Holberton School" src="https://apply.holbertonschool.com/holberton-logo.png">
                              </div>
                              <div class="integrants" style="width: 40%; font-family: sans-serif; text-align: center; color: #ffffff;">
                                <p>
                                   © Designed by <strong>The Code Troopers</strong> team, all rights reserved.
                                </p> 
                              </div>
                              <div align="center" class="techstart-logo" style="width: 30%; min-height: 3rem;">
                                <img class="tech-img" style="min-width: 4rem; max-width: 8rem; padding-top: 0.6rem;" alt="techstar" src="https://cdn.brandfolder.io/70W92OEX/as/q0vc05-3hg50o-8p4uw5/logo-dark.png">
                              </div>
                           </div>        
                          `, // html body

                });
                console.log(info)
                console.log("Total profiles selected:", cof.length);
            } catch (error) {
                console.log('Fake error in email')
            }
        }
        mongoose.disconnect().then(() => console.log("Connection close"));
    }).catch((err) => console.log("select failed!\n", err));
}).catch((err) => console.log("connection failed!\n", err));
