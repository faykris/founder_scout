import assert from "assert";
import mongoose from 'mongoose';
import co_founders_search from "./functions/co_founders_search.js";
import company_info from "./functions/company_info.js";
import sleep from "./functions/sleep.js";
import dotenv from 'dotenv';

const binGeoList = [];
const max = 30;
const min = 5;


if (process.argv.length < 3) {
    console.log("Usage: node [NODE_SCRIPT] [binGeo id] ...");
    process.exit(1);
}

dotenv.config();
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
            //console.log(profile_list);
            if (profile_list.type === 'max-redirect') {
                console.log("Max redirect reached - change profile header fetch info.");
                break;
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
                                    // filling in profile info
                                    all_cof_info.profileInfo.vmid = vmid;
                                    all_cof_info.profileInfo.profileUrl = profile_list[j].profileUrl;
                                    all_cof_info.profileInfo.linkedInProfileUrl = profile_list[j].linkedInProfileUrl;
                                    all_cof_info.profileInfo.firstName = profile_list[j].firstName;
                                    all_cof_info.profileInfo.lastName = profile_list[j].lastName;
                                    all_cof_info.profileInfo.fullName = profile_list[j].fullname;
                                    all_cof_info.profileInfo.title = profile_list[j].title;
                                    all_cof_info.profileInfo.location = profile_list[j].location;
                                    all_cof_info.profileInfo.isPremium= profile_list[j].premium;
                                    all_cof_info.profileInfo.profileImageUrl = profile_list[j].profileImageUrl;
                                    // filling in company info
                                    all_cof_info.companyInfo.companyId = profile_list[j].companyId;
                                    all_cof_info.companyInfo.companyUrl= profile_list[j].companyUrl;
                                    if (companyInfo.website !== undefined) {
                                        all_cof_info.companyInfo.websiteUrl = companyInfo.website;
                                    }
                                    all_cof_info.companyInfo.companyName = profile_list[j].companyName;
                                    all_cof_info.companyInfo.industry = profile_list[j].industry;
                                    if (companyInfo.headquarters !== undefined) {
                                        all_cof_info.companyInfo.location.country = companyInfo.headquarters.country;
                                        all_cof_info.companyInfo.location.city = companyInfo.headquarters.city;
                                    }
                                    all_cof_info.companyInfo.createdAt.month = profile_list[j].month;
                                    all_cof_info.companyInfo.createdAt.year = profile_list[j].year;
                                    if (companyInfo.companyPictureDisplayImage !== undefined) {
                                        all_cof_info.companyInfo.companyImageUrl = companyInfo.companyPictureDisplayImage.rootUrl +
                                          companyInfo.companyPictureDisplayImage.artifacts[0].fileIdentifyingUrlPathSegment;
                                    }
                                    all_cof_info.companyInfo.summary = profile_list[i].summary;
                                    all_cof_info.companyInfo.timestamp = new Date().toISOString();

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
                                    //break;
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
    .catch((err) => console.log("Connection failed!\n", err))

// (id:105015875),(id:101174742),(id:105080838),(id:101452733)
/*  fetch("https://www.linkedin.com/sales-api/salesApiPeopleSearch?" +
  "q=peopleSearchQuery&start=0&count=25&query=(companySize:List(B),doFetchHeroCard:false,bingGeo:" +
  "(includedValues:List((id:105015875),(id:101174742),(id:105080838),(id:101452733))),recentSearchParam:(doLogHistory:true),spotlightParam:(selectedType:ALL),titleV2:(scope:CURRENT,includedValues:List((text:Co-Founder,id:103))),tenureAtCurrentCompany:List(1),tenureAtCurrentPosition:List(1),trackingParam:(sessionId:IEPkPLzbSj6Vp2mTIIu7ww==),doFetchFilters:true,doFetchHits:true,doFetchSpotlights:true)&decorationId=com.linkedin.sales.deco.desktop.search.DecoratedPeopleSearchHitResult-10", {
  "headers": {
    "accept": "* /*",
    "accept-language": "en-US,en;q=0.9",
    "csrf-token": "ajax:5178268925689162125",
    "sec-ch-ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-li-identity": "dXJuOmxpOm1lbWJlcjo5NDE5OTA5NTU",
    "x-li-lang": "en_US",
    "x-li-page-instance": "urn:li:page:d_sales2_search_people;dBO/uf6BQCiGYyW9kzSlhA==",
    "x-restli-protocol-version": "2.0.0",
    "cookie": "li_sugr=3f85b1fc-ea23-417b-babd-ded06ce09694; bcookie=\"v=2&acb0ab51-478e-4faa-819a-ac7c23fb853a\"; bscookie=\"v=1&20210905232313a1fb4eca-97f2-4e4f-8bd9-a5dcdbcaf247AQEDFCuzVoxD5ewuYiOiyDPCCsM8Vqzh\"; aam_uuid=70217657370447217862075267279885908151; timezone=America/Bogota; at_check=true; s_fid=7CD8F46604ABDD82-28F45EC741951DCB; s_cc=true; spectroscopyId=ecef233c-7661-42f2-a8bf-1f7b9f424426; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; _gcl_au=1.1.470399711.1633909461; li_rm=AQHpePiVPegsCgAAAXyEzr6fkLKqtOEuGveSPtl7anMDdoLsy43QoWdtHD6y8x1_uhOsiJ_tJLVeIgui5X1IYQHSI2UwKTV7C2aZgHmAikhgL0X9bDKskK_tSl409R3LIecBu5qMZAb4zMJItsp_3R-vB1t9J1vxbklsavB1vx1l0bEcb4pdP2nRCiXoX5jgwLFXmNlXfxZ2OBHlPPqXJoSnTwwrIUOdHODqlwbAe6BRyjCvlW_Fr9EPOR0xmoa7LqWHLTm3Kpm-PcvEEi5OFwF6WfxOOXHga6qMxtSnJ9pGVaS0P6MnU-uNy6vbWbnkMlxYiIqsZroW_7KKV3A; g_state={\"i_l\":1,\"i_p\":1634322980357}; li_theme=system; transaction_state=AgFU54BTQ7FWoAAAAXyE01mITmPPATShFe8jYlz4X8OcW1RFzc6ndqfPT_fswHGBhp6QVKMZgYiJK9sIuElcn8aE67PeCBC6kvOCugICp0b3xjtmyk8fWmj81ftzHXROH1iviAP4LozXNXnP_D5wbo7dBeZ177wJtaH-jLjz5b0fMIJTWVRESzyi2kSMu-RNp13H3T9Vog; PLAY_LANG=en; __ssid=d8be94cc-fd36-4c18-9dcc-0034faada79f; _ga=GA1.2.2111367483.1634316095; dfpfpt=2d151106630c4b2095f4a03296ef8477; u_tz=GMT-05:00; SID=1f4f5b67-1cbb-4c9d-aab4-0b3ed3e68004; VID=V_2021_10_15_17_753; mbox=PC#35c29004303940afbfdcb00e26b03a35.34_0#1649870273|session#1a6cd023273144c08d220dd101d1221e#1634318916; visit=v=1&M; fptctx2=taBcrIH61PuCVH7eNCyH0J3vcgCbtea3jxoypkMntAjjdEd8KMsXOQybe5v%252ftpq8JcrfikpoUq9HYfvB4UMCve06yrDUpZHf0hHG34NpbuKtE6I%252fMrtNc013R4HFchCoJQzkdfDkVxF%252fh1xnVtAplrsb5GyNcb9qSbzbnovzJM0%252bquEWGPioFOc%252bTKI8VnkJIGzrR8yk9Sg%252bSoiFy%252bFn2j4z%252fTCE%252bnR5O5afGx42cQK%252bPe75gEqnFna8Up1YFsbjJ08OCIvOU%252b4TnQ9NrexN%252b%252f9lnTIvx6gHaR8bfR2U%252bBdVSgHt4193qfM3TbQ0a0wy; s_ips=911; gpv_pn=www.linkedin.com%2Fpayments%2Fpurchase; s_plt=2.33; s_pltp=www.linkedin.com%2Fpayments%2Fpurchase; s_sq=lnkdprod%3D%2526c.%2526a.%2526activitymap.%2526page%253Dwww.linkedin.com%25252Fpayments%25252Fpurchase%2526link%253DReview%252520order%2526region%253Dwallet%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253Dwww.linkedin.com%25252Fpayments%25252Fpurchase%2526pidt%253D1%2526oid%253DReview%252520order%2526oidt%253D3%2526ot%253DSUBMIT; s_tslv=1634488695380; s_tp=1495; s_ppv=www.linkedin.com%2Fpayments%2Fpurchase%2C94%2C61%2C1412%2C1%2C1; li_er=v=1&r=urn:li:contract:369486696&t=1632786169397&g=MDIxrVzVg6/m7QqBk4f18mdxnaPwdTfEYUvVxDDTxExtBXs=; cap_session_id=3689516816:1; sdsc=30%3A1%2C1634489209818%7ECAOR%2C0%7ECAST%2C3215S7ZEPD5JTNl9K%2Fche4F74o7mU%3D; PLAY_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFjY291bnQuY2xvc2UucHJlY29uZGl0aW9uLnNlc3Npb24ua2V5IjoiYWNjb3VudC5jbG9zZS5wcmVjb25kaXRpb24udmFsdWUuZmFpbGVkdXJuOmxpOm1lbWJlcjo5NDE1NzU0NjYiLCJzZXNzaW9uX2lkIjoiMTk5NTY0OTYtM2ZkNS00MDcyLWIwNjItYTY5ZGMzYzZmZTY5fDE2MzQ0ODg2MTYiLCJhbGxvd2xpc3QiOiJ7XCJCdXNpbmVzcyBTZWdtZW50OlN0cmF0ZWdpY1wiOlwiZmFsc2VcIn0iLCJyZWNlbnRseS1zZWFyY2hlZCI6ImNoYW5nZXxzYWxlc3xuYXZpZ2F0b3J8cmVjbHV0ZXJ8ZWxpbWluYXJ8Y3VlbnRhfGRlbGV0ZXxhY2NvdW50IiwicmVmZXJyYWwtdXJsIjoiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3ByZW1pdW0vc3VydmV5Lz9kZXN0UmVkaXJlY3RVUkw9aHR0cHMlM0ElMkYlMkZ3d3cubGlua2VkaW4uY29tJTJGb25ib2FyZGluZyUyRnN0YXJ0JTJGZm9sbG93LXJlY29tbWVuZGF0aW9ucyUyRm5ldyUyRiUzRnNvdXJjZSUzRGd1ZXN0X2hvbWVwYWdlLWJhc2ljX25hdi1oZWFkZXItc2lnbmluJTI2c2hvd1ByZW1pdW1XZWxjb21lQmFubmVyJTNEdHJ1ZSZ1cHNlbGxPcmRlck9yaWdpbj1wcmVtaXVtX25hdl91cHNlbGxfdGV4dCIsImFpZCI6IiIsIlJOVC1pZCI6InwwIiwicmVjZW50bHktdmlld2VkIjoiNDE2NTg0fDYzIiwiQ1BULWlkIjoiw4d1wo58w6fDh0_Dh8KSw59cdTAwMDbCm8OGwpPDnsOaIiwiZXhwZXJpZW5jZSI6ImVudGl0eSIsImlzX25hdGl2ZSI6ImZhbHNlIiwidHJrIjoiIn0sIm5iZiI6MTYzNDQ4OTUzMywiaWF0IjoxNjM0NDg5NTMzfQ.NF7m9qHR7rQDiaHwkiiVlA4gcoPxYvoEp54uqgCkHbM; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18920%7CMCMID%7C70429233835449844972018733740781849468%7CMCAAMLH-1635362383%7C4%7CMCAAMB-1635362383%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1634764783s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C-616281000; lang=v=2&lang=en-us; liap=true; li_at=AQEDATglpCsFIt-2AAABfJ8lyKcAAAF8wzJMp04APzmJEHbA9sY5LR4n1jwd5YbjiBFa7Fk7-kynraW7IEjDPorsEriWgJGbdwxmix9FdDR3-mhYCZz110m0eLLoRg_X4iHwd5qsYyyCp3nzggAzsOes; JSESSIONID=\"ajax:5178268925689162125\"; lidc=\"b=TB55:s=T:r=T:a=T:p=T:g=3026:u=2:x=1:i=1634757626:t=1634836051:v=2:sig=AQFg4fDOUztt0GIVhusnpTepXDQsxEq9\"; UserMatchHistory=AQJeBgiyX6udkAAAAXyfJdR9nveh_N68c9OxncETIYzE1XlRc1v9gRT-VTo8yJISASbGSvHD66D8Ddw7gn5xHqsDamFmTD-zfG25W38Z-gnOZ48-Kct9DPpxoMMcUtZbD6bKVWI-S0T-mpLZCda6jNOlwGuN2eZF3KbuzmHWOrOwYXAsKEKxdE3KnUl1rY3Y0piRP4coFRC_XrwJJoVnb30POnxMmaCr7HwiNJVbE8o0nNjTCV9Lkrf_Va0Z0RqttQleosn7EN8qqTtx6rznEuneCixCesNAl2YwKh8; li_a=AQJ2PTEmc2FsZXNfY2lkPTk3NjE4MDgwNyUzQSUzQTMxNTk2MTYwN1TRherSu34ct0hrxVKyRibtCe8p"
  },
  "referrer": "https://www.linkedin.com/sales/search/people?savedSearchId=50500115&searchSessionId=IEPkPLzbSj6Vp2mTIIu7ww%3D%3D",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors"
});
*/