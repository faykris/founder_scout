import mongoose from 'mongoose';
import fs from 'fs';
import fetch from "node-fetch";
import assert from "assert";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function company_info(companyId) {
  const result = await fetch("https://www.linkedin.com/sales-api/salesApiCompanies/" +
    companyId +
    "?decoration=%28entityUrn%2Cname%2Caccount%28saved%2CnoteCount%2ClistCount%2CcrmStatus%29%2CpictureInfo%2CcompanyPictureDisplayImage%2Cdescription%2Cindustry%2CemployeeCount%2CemployeeDisplayCount%2CemployeeCountRange%2Clocation%2Cheadquarters%2Cwebsite%2Crevenue%2CformattedRevenue%2CemployeesSearchPageUrl%2CflagshipCompanyUrl%2Cemployees*~fs_salesProfile%28entityUrn%2CfirstName%2ClastName%2CfullName%2CpictureInfo%2CprofilePictureDisplayImage%29%29", {
    "headers": {
      "accept": "*/*",
      "accept-language": "es-ES,es;q=0.9",
      "csrf-token": "ajax:3228420206501524135",
      "sec-ch-ua": "\"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-li-identity": "dXJuOmxpOm1lbWJlcjo5Mzc3NDc3ODk",
      "x-li-lang": "en_US",
      "x-li-page-instance": "urn:li:page:d_sales2_search_people;1En/sqfSS7C5ptaTXys++g==",
      "x-restli-protocol-version": "2.0.0",
      "cookie": "li_sugr=f158f3ac-77e6-447e-b2af-9545fc5d9e06; bcookie=\"v=2&c9eb21a4-fc2f-4f29-8659-b41b16dd4ecf\"; bscookie=\"v=1&20211001172434d70910a8-e1cc-49e9-8aa0-0ecff8027596AQFEM3tpoixToYXNm3jTfcXXrkcKWORt\"; aam_uuid=40577756698522595741660832106329087972; g_state={\"i_p\":1633116282895,\"i_l\":1}; _gcl_au=1.1.685508982.1633109242; timezone=America/Bogota; _guid=0fcb2493-f4c3-46d2-9ca0-1ca73e9ccc95; __ssid=aadffd93-2af2-4702-a697-ec3571abb081; _ga=GA1.2.1481398525.1633109501; dfpfpt=d88a4d9619c74e1a8a91bbb653ca0471; li_rm=AQENfHtB8yo-BQAAAXw8-eleeGwbNTt6zKYjMjYBqdE2ZSESsoHTQoBG2X1AlNE9SnFtJADOYuNtVjJlnamAjlv8ihEg4mLqXf-6_wvmOpYuCjr6I9B0TCDa; JSESSIONID=\"ajax:3228420206501524135\"; G_ENABLED_IDPS=google; AnalyticsSyncHistory=AQIWmjq1wTdImwAAAXx6oVO3FwNZmgyu7cZPOARgwIAu-KHJEUNOnbOsiRRH0TBqUNsvQzg0Lsua4kTiuQI8FQ; lms_ads=AQGx-otjPXkkdQAAAXx6oVT5qLfiSlzkhVCQZGCJf8zVU9mOyoifU8s1Ak8vXGzyO4FZW6rwVwYT-aob6QNhStM0aYW8a4dj; lms_analytics=AQGx-otjPXkkdQAAAXx6oVT5qLfiSlzkhVCQZGCJf8zVU9mOyoifU8s1Ak8vXGzyO4FZW6rwVwYT-aob6QNhStM0aYW8a4dj; spectroscopyId=d02aaf7c-d4f7-4dd4-bca6-09acaa7cf8ca; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18916%7CMCMID%7C40800350625631250531712310401552477231%7CMCAAMLH-1634920946%7C4%7CMCAAMB-1634920946%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1634323346s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C1202759587; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; _gid=GA1.2.1674209641.1634316611; at_check=true; s_ips=1269; s_cc=true; visit=\"v=1&M\"; liap=true; li_at=AQEDATfk5U0C9YuoAAABfITedaMAAAF8qOr5o04AZ0kv_pSlBDEVFyO7S8ebc6i9mVexd_wWfDH2bn-Nptr-uGrzXtYJ5VuvSzsnHEhkmEWLRvO4QoemXqf4f08YqN4l67n2Pwm7ZM6ILIgzQrCa-iVa; cap_session_id=3688678656:1; li_er=v=1&r=urn:li:contract:369488136&t=1632613776803&g=MDIxBVpKQAnHlsYnTW3Pnu5ew2jxltPKFBvgp5f5IHIs2rg=; u_tz=GMT-05:00; PLAY_LANG=es; PLAY_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7InNlc3Npb25faWQiOiIyZTkwN2JlNy1iMjZlLTQwNWMtYWI3ZC04ZTIwNTExYWM2MmZ8MTYzNDMxNzI2OSIsImFsbG93bGlzdCI6Int9IiwicmVjZW50bHktc2VhcmNoZWQiOiIiLCJyZWZlcnJhbC11cmwiOiJodHRwczovL3d3dy5nb29nbGUuY29tLyIsImFpZCI6IiIsIlJOVC1pZCI6InwwIiwicmVjZW50bHktdmlld2VkIjoiMTE3MDg0IiwiQ1BULWlkIjoiWMK0wo1hw5NSXHUwMDBFwovCtGbCpzUzXHUwMDExV8OOIiwiZXhwZXJpZW5jZSI6ImVudGl0eSIsImlzX25hdGl2ZSI6ImZhbHNlIiwidHJrIjoiIn0sIm5iZiI6MTYzNDMxNzI3MSwiaWF0IjoxNjM0MzE3MjcxfQ.4l0i3Wo17WQp2ekBXdQfSqHu8YxQyYmqtm3suQijZ9Q; lang=v=2&lang=en-us; SID=cac27ffe-3b8b-4ee9-9406-bef2f2ff3116; VID=V_2021_10_15_17_481; _gac_UA-62256447-1=1.1634317525.EAIaIQobChMI4YyzmfPM8wIVA7LICh30uALsEAAYASAAEgKWhPD_BwE; mbox=session#4850ee71148e4e80b241a0b8105fbe67#1634318510|PC#4850ee71148e4e80b241a0b8105fbe67.34_0#1649869525; gpv_pn=business.linkedin.com%2Fes-es%2Fsales-solutions%2Fcx%2Flinkedin-sales-navigator; _gcl_aw=GCL.1634317525.EAIaIQobChMI4YyzmfPM8wIVA7LICh30uALsEAAYASAAEgKWhPD_BwE; _gcl_dc=GCL.1634317525.EAIaIQobChMI4YyzmfPM8wIVA7LICh30uALsEAAYASAAEgKWhPD_BwE; s_plt=3.86; s_pltp=business.linkedin.com%2Fes-es%2Fsales-solutions%2Fcx%2Flinkedin-sales-navigator; s_tp=2906; s_tslv=1634317544786; s_ppv=business.linkedin.com%2Fes-es%2Fsales-solutions%2Fcx%2Flinkedin-sales-navigator%2C100%2C44%2C2906%2C2%2C2; UserMatchHistory=AQK-9f9Ut2XlqQAAAXyE_HBhFS9DDGMNoFmEOBGUCcgWf3Q5RjCxAj5FX6TH-sZR_Nedw2j4xHahXncTNHu5XER9t-VeSTnppZnlWafNrXZi6M0KKeUFz8KvAPeraUMPNtiK9_Y72E_08HQxedMO6ndvnwOwWbWf2Uh0TOi2lvP9vuLD1NrC8RIdG4P73KB9eWBALMpM4BPqmqFzfOa1BLl2x5HBfRwR4y3ANHC77_CY0_8ZbRo5MLGaU5B138eh6eEwR8uH_ruImtos55qQ38WVpRYjH4UXydcEaq0; lidc=\"b=TB89:s=T:r=T:a=T:p=T:g=2665:u=7:x=1:i=1634318710:t=1634389270:v=2:sig=AQGlx5BfiDAHkPQrQuUKYdYMC4SYzozQ\"; sdsc=1%3A1SZM1shxDNbLt36wZwCgPgvN58iw%3D; li_a=AQJ2PTEmc2FsZXNfY2lkPTk2ODk1MjcwNyUzQSUzQTMxMTkwNzgwN1qQvw5-u1bX_am5TBIKSpUr0IeW"
    },
    "referrer": "https://www.linkedin.com/sales/search/people?companySize=B&doFetchHeroCard=false&geoIncluded=103323778%2C100446943&logHistory=true&rsLogId=1104479258&searchSessionId=1MuzrhWbSC2zjyMiJhKnbw%3D%3D&spellingCorrectionEnabled=false&tenureAtCurrentCompany=1&tenureAtCurrentPosition=1&titleIncluded=Co-Founder%3A103&titleTimeScope=CURRENT",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  });
  return await result.json();
}

if (process.argv.length !== 3) {
  console.log("Usage: node [NODE_SCRIPT] [FILE.JSON]");
  process.exit(1);
}

const min = 5;
const max = 30;
// make a connection
mongoose.connect('mongodb+srv://faykris:91crash91@cluster0.bxsvo.mongodb.net/founder_scout?retryWrites=true&w=majority');

// get reference to database?"
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', async function () {
  console.log("Connected to MongoDB Atlas");

  // Define default schema
  const FounderSchema = mongoose.Schema(
    {},
    {strict: false}
  );
  // Compile schema to model
  const Cof = mongoose.model('Co-Founders', FounderSchema, 'co-founders');

  let rawdata =  fs.readFileSync(process.argv[2]);
  let co_founders = JSON.parse(rawdata);

  console.log('---------- Starting exporting data process ----------');
  let success = 0;
  let ignored = 0;
  for (let i = 0; i < co_founders.length; i++) {
    try {
      let all_cof_info = {"profileInfo": {}, "companyInfo": {location: {}, createdAt: {}}};
      const companyId = co_founders[i].companyId;
      const vmid = co_founders[i].vmid;
      const time = (Math.random() * (max - min) + min).toFixed();

      const promise = Cof.findOne({"profileInfo.vmid": vmid}).exec();
      assert.ok(promise instanceof Promise);

      await promise.then(async function (cof) {
        if (cof === null) { // if profile doesn't exists in the database
          console.log('---> Scraping company information of %s in %d seconds... ', co_founders[i].fullname, time);
          await sleep(time * 1000);
          const companyInfo = {}
          if (companyId !== undefined) {
            const companyInfo = await company_info(companyId).catch((err) => console.error(err));
            // filling in profile info
            all_cof_info.profileInfo['vmid'] = vmid;
            all_cof_info.profileInfo['profileUrl'] = co_founders[i].profileUrl;
            all_cof_info.profileInfo['linkedInProfileUrl'] = co_founders[i].linkedInProfileUrl;
            all_cof_info.profileInfo['firstName'] = co_founders[i].firstName;
            all_cof_info.profileInfo['lastName'] = co_founders[i].lastName;
            all_cof_info.profileInfo['fullName'] = co_founders[i].fullname;
            all_cof_info.profileInfo['title'] = co_founders[i].title;
            all_cof_info.profileInfo['location'] = co_founders[i].location;
            all_cof_info.profileInfo['isPremium'] = co_founders[i].premium;
            all_cof_info.profileInfo['profileImageUrl'] = co_founders[i].profileImageUrl;
            // filling in company info
            all_cof_info.companyInfo['companyId'] = co_founders[i].companyId;
            all_cof_info.companyInfo['companyUrl'] = co_founders[i].companyUrl;
            if (companyInfo !== {} && companyInfo.website !== undefined) {
              all_cof_info.companyInfo['websiteUrl'] = companyInfo.website;
            }
            all_cof_info.companyInfo['companyName'] = co_founders[i].companyName;
            all_cof_info.companyInfo['industry'] = co_founders[i].industry;
            if (companyInfo !== {} && companyInfo.headquarters !== undefined) {
              all_cof_info.companyInfo.location['country'] = companyInfo.headquarters.country;
              all_cof_info.companyInfo.location['city'] = companyInfo.headquarters.city;
            }
            all_cof_info.companyInfo.createdAt['month'] = co_founders[i].month;
            all_cof_info.companyInfo.createdAt['year'] = co_founders[i].year;
            if (companyInfo !== {} && companyInfo.companyPictureDisplayImage !== undefined) {
              all_cof_info.companyInfo['companyImageUrl'] = companyInfo.companyPictureDisplayImage.rootUrl +
                companyInfo.companyPictureDisplayImage.artifacts[0].fileIdentifyingUrlPathSegment;
            }
            all_cof_info.companyInfo['summary'] = co_founders[i].summary;
            all_cof_info.companyInfo['timestamp'] = new Date().toISOString();

            const co_founder = new Cof(all_cof_info);

            const promise = co_founder.save();
            assert.ok(promise instanceof Promise);

            await promise.then(async function (doc) {
              console.log(":D - %s from %s saved in the co-founders collection.", co_founders[i].fullname, co_founders[i].companyName);
              success++;
            });
            await promise.catch(async (err) => console.log(err));
          }
          else {
            console.log(":( - %s from %s doesn't have companyId. Ignored.", co_founders[i].fullname, co_founders[i].companyName);
            ignored++;
          }
        }
        else {
          console.log(":| - %s from %s already exists in the collection. Ignored.", co_founders[i].fullname, co_founders[i].companyName);
          ignored++;
        }
      });
      console.log("* Profiles processed: %d/%d saved: %d ignored: %d" , i + 1, co_founders.length, success, ignored);
    }
    catch (exe) {
      console.error("X( - failed processing company information %s from %s. Ignored.", co_founders[i].fullname, co_founders[i].companyName)
      console.error(exe);
    }
  }
  console.log('------------ Exporting data process ended ------------');
  process.exit(0);
});
