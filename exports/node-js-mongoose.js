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
      "sec-ch-ua": "'Chromium';v='94', 'Google Chrome';v='94', ';Not A Brand';v='99'",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "'Windows'",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-li-identity": "dXJuOmxpOm1lbWJlcjo5Mzc3NDc3ODk",
      "x-li-lang": "en_US",
      "x-li-page-instance": "urn:li:page:d_sales2_search_people_saved_all;U3z6yR4CRTmO8sST4NX/UQ==",
      "x-restli-protocol-version": "2.0.0",
      "cookie": "li_sugr=f158f3ac-77e6-447e-b2af-9545fc5d9e06; bcookie='v=2&c9eb21a4-fc2f-4f29-8659-b41b16dd4ecf'; bscookie='v=1&20211001172434d70910a8-e1cc-49e9-8aa0-0ecff8027596AQFEM3tpoixToYXNm3jTfcXXrkcKWORt'; aam_uuid=40577756698522595741660832106329087972; g_state={'i_p':1633116282895,'i_l':1}; _gcl_au=1.1.685508982.1633109242; timezone=America/Bogota; _guid=0fcb2493-f4c3-46d2-9ca0-1ca73e9ccc95; __ssid=aadffd93-2af2-4702-a697-ec3571abb081; _ga=GA1.2.1481398525.1633109501; gpv_pn=www.linkedin.com%2Fpayments%2Fpurchase; dfpfpt=d88a4d9619c74e1a8a91bbb653ca0471; s_tslv=1633109815875; li_rm=AQENfHtB8yo-BQAAAXw8-eleeGwbNTt6zKYjMjYBqdE2ZSESsoHTQoBG2X1AlNE9SnFtJADOYuNtVjJlnamAjlv8ihEg4mLqXf-6_wvmOpYuCjr6I9B0TCDa; JSESSIONID='ajax:3228420206501524135'; G_ENABLED_IDPS=google; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18914%7CMCMID%7C40800350625631250531712310401552477231%7CMCAAMLH-1634749753%7C4%7CMCAAMB-1634749753%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1634152153s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C1202759587; li_at=AQEDATfk5U0F0G8KAAABfHqhLYAAAAF8nq2xgE4AWGgnwwvICV85OcoYoHO05zsPC7_xnhqQb6n9T0zAmEPKp1X_hsMXCGG5_NWpnPy1Q_5LW0fLH7Ey0khHqx9Uj3WdonC0wFWeoxRsWplBCfD-hwou; liap=true; lang=v=2&lang=en-us; spectroscopyId=ca1a9ec3-25f8-43d0-873c-2f005acffe45; UserMatchHistory=AQLqPVTztmZ6MQAAAXx6oVO3l7hdpNHDEeUhBEM3FrDbQENteeruCbaf5oGNBB5LZQ5ZF9AKAUKVQ3MpzgFvSgz1I78zDrz7qEQZEJWpL_bSeqDvAkti6bI458Z2pVEiXvB-Dte1UfChdZ3B-RjKtNO4BoCz9kq4TCF3Dc-895Sx0sohWbWqSFhCijxSSkrohZRrdTU4Ywl6vygjW5Y0CrES3H1wGrvPLyyqM3jnrzlgiZTD8OhGN-0JqeYbWGN4dfYGsOhFAZHemGw04wBoAxdw4LGGv-udCfxZ7ws; AnalyticsSyncHistory=AQIWmjq1wTdImwAAAXx6oVO3FwNZmgyu7cZPOARgwIAu-KHJEUNOnbOsiRRH0TBqUNsvQzg0Lsua4kTiuQI8FQ; lms_ads=AQGx-otjPXkkdQAAAXx6oVT5qLfiSlzkhVCQZGCJf8zVU9mOyoifU8s1Ak8vXGzyO4FZW6rwVwYT-aob6QNhStM0aYW8a4dj; lms_analytics=AQGx-otjPXkkdQAAAXx6oVT5qLfiSlzkhVCQZGCJf8zVU9mOyoifU8s1Ak8vXGzyO4FZW6rwVwYT-aob6QNhStM0aYW8a4dj; lidc='b=TB89:s=T:r=T:a=T:p=T:g=2661:u=5:x=1:i=1634144966:t=1634183032:v=2:sig=AQEfpN_Zh2-ETOq82oLdRWZeuzrGIDwQ'; li_a=AQJ2PTEmc2FsZXNfY2lkPTk2ODk1MjcwNyUzQSUzQTMxMTkwNzgwN6k-qC_VOfGfK4SZ1oQP_PsZwajs"
    },
    "referrer": "https://www.linkedin.com/sales/search/people?savedSearchId=50540467&searchSessionId=dMkQVeUhTueKj3uPGWJBWA%3D%3D",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  });

  return await result.json();
}

// make a connection
mongoose.connect('mongodb+srv://faykris:91crash91@cluster0.bxsvo.mongodb.net/founder_scout?retryWrites=true&w=majority');

// get reference to database?"
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', async function () {
  console.log("Connection Successful!");

  // define Schema
  const FounderSchema = mongoose.Schema(
    {},
    {strict: false}
  );
  // compile schema to model
  const Cof = mongoose.model('Co-Founders', FounderSchema, 'co-founders');

  let rawdata =  fs.readFileSync('2021-10-15T00:26:09.921Z.json');
  let co_founders = JSON.parse(rawdata);

  console.log('----- Starting exporting data process -----');
  let success = 0;
  let ignored = 0;
  for (let i = 0; i < co_founders.length; i++) { // co_founders.length
    let all_cof_info = {"profileInfo": {}, "companyInfo": {location: {}, createdAt: {}}};
    const companyId = co_founders[i].companyId;
    const vmid = co_founders[i].vmid;
    const min = 5;
    const max = 30;
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
        }

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
        if (companyInfo.length !== 0 && companyInfo.website !== undefined) {
          all_cof_info.companyInfo['websiteUrl'] = companyInfo.website;
        }
        all_cof_info.companyInfo['companyName'] = co_founders[i].companyName;
        all_cof_info.companyInfo['industry'] = co_founders[i].industry;
        if (companyInfo.length !== 0 && companyInfo.headquarters !== undefined) {
          all_cof_info.companyInfo.location['country'] = companyInfo.headquarters.country;
          all_cof_info.companyInfo.location['city'] = companyInfo.headquarters.city;
        }
        all_cof_info.companyInfo.createdAt['month'] = co_founders[i].month;
        all_cof_info.companyInfo.createdAt['year'] = co_founders[i].year;
        if (companyInfo.length !== 0 && companyInfo.companyPictureDisplayImage !== undefined) {
          all_cof_info.companyInfo['companyImageUrl'] = companyInfo.companyPictureDisplayImage.rootUrl +
            companyInfo.companyPictureDisplayImage.artifacts[0].fileIdentifyingUrlPathSegment;
        }
        all_cof_info.companyInfo['summary'] = co_founders[i].summary;
        all_cof_info.companyInfo['timestamp'] = co_founders[i].timestamp;

        // a document instance
        const co_founder = new Cof(all_cof_info);

        // save model to database
        const promise = co_founder.save();
        assert.ok(promise instanceof Promise);

        await promise.then(async function (doc) {
          console.log(":D - %s from %s saved to profiles collection.", co_founders[i].fullname, co_founders[i].companyName);
          success++;
        });
        await promise.catch(async (err) => console.log(err));
      }
      else {
        console.log(":| - %s from %s already exists in the collection. Ignored.", co_founders[i].fullname, co_founders[i].companyName);
        ignored++;
      }
    });
    console.log("* Profiles processed: %d/%d", (i + 1), co_founders.length);
    if (i === co_founders.length - 1 ) {
      console.log('------ Exporting data process ended ------' , i);
      process.exit(0);
    }
  }
});
