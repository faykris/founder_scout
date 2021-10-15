import fetch from 'node-fetch';
import fs from 'fs';


let profileList = [];
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function linkedInSearch(p_list, count, success, fail) { // filter by country: Colombia -> bingGeo:(includedValues:List((id:100876405))),
  const result = await fetch("https://www.linkedin.com/sales-api/salesApiPeopleSearch?" +
    "q=savedSearch&savedSearchId=50540467&newResultsOnly=false&" +
    "start="+ String(count)+"&" +
    "count=25",
    {
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
        "x-li-page-instance": "urn:li:page:d_sales2_search_people_saved_all;3JosVSeKSryyCf5hDhDjoA==",
        "x-restli-protocol-version": "2.0.0",
        "cookie": "li_sugr=f158f3ac-77e6-447e-b2af-9545fc5d9e06; bcookie=\"v=2&c9eb21a4-fc2f-4f29-8659-b41b16dd4ecf\"; bscookie=\"v=1&20211001172434d70910a8-e1cc-49e9-8aa0-0ecff8027596AQFEM3tpoixToYXNm3jTfcXXrkcKWORt\"; aam_uuid=40577756698522595741660832106329087972; g_state={\"i_p\":1633116282895,\"i_l\":1}; _gcl_au=1.1.685508982.1633109242; timezone=America/Bogota; _guid=0fcb2493-f4c3-46d2-9ca0-1ca73e9ccc95; __ssid=aadffd93-2af2-4702-a697-ec3571abb081; _ga=GA1.2.1481398525.1633109501; gpv_pn=www.linkedin.com%2Fpayments%2Fpurchase; dfpfpt=d88a4d9619c74e1a8a91bbb653ca0471; s_tslv=1633109815875; li_rm=AQENfHtB8yo-BQAAAXw8-eleeGwbNTt6zKYjMjYBqdE2ZSESsoHTQoBG2X1AlNE9SnFtJADOYuNtVjJlnamAjlv8ihEg4mLqXf-6_wvmOpYuCjr6I9B0TCDa; JSESSIONID=\"ajax:3228420206501524135\"; G_ENABLED_IDPS=google; li_at=AQEDATfk5U0F0G8KAAABfHqhLYAAAAF8nq2xgE4AWGgnwwvICV85OcoYoHO05zsPC7_xnhqQb6n9T0zAmEPKp1X_hsMXCGG5_NWpnPy1Q_5LW0fLH7Ey0khHqx9Uj3WdonC0wFWeoxRsWplBCfD-hwou; liap=true; AnalyticsSyncHistory=AQIWmjq1wTdImwAAAXx6oVO3FwNZmgyu7cZPOARgwIAu-KHJEUNOnbOsiRRH0TBqUNsvQzg0Lsua4kTiuQI8FQ; lms_ads=AQGx-otjPXkkdQAAAXx6oVT5qLfiSlzkhVCQZGCJf8zVU9mOyoifU8s1Ak8vXGzyO4FZW6rwVwYT-aob6QNhStM0aYW8a4dj; lms_analytics=AQGx-otjPXkkdQAAAXx6oVT5qLfiSlzkhVCQZGCJf8zVU9mOyoifU8s1Ak8vXGzyO4FZW6rwVwYT-aob6QNhStM0aYW8a4dj; lang=v=2&lang=en-us; spectroscopyId=a1223648-db18-44e8-b79c-c8b16b0c347b; UserMatchHistory=AQLj8hEdYxUaBAAAAXyA21bzorFJnxTmEP4hIopEYIVGFmRNnwd-g1tZqLJ4jUvqWJxLIuytQrN625uADuc2RxPPHfLiCPWmD9mpTOQb26bfZYTUE0uWItqhnmIlqUUz-QZa4wezP2djU0SDIxF_WGNldqeEYWBKCYR9OD2Aoq2DnOlQJ3thsEz2BauWzyx9VA4QPdA1qAhXSlMUqcwBCYCxQxRn5Zd25LA_-ANI11p0S8MMU0hVmdQzi6tHk_kvmseWf-BVDxLZ9c6BX91AMYcknDEgpdw23Z77Mps; lidc=\"b=VB89:s=V:r=V:a=V:p=V:g=2718:u=6:x=1:i=1634249432:t=1634251198:v=2:sig=AQEKwKZjlb9r7ucUzntKaDxheOPIebhD\"; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18914%7CMCMID%7C40800350625631250531712310401552477231%7CMCAAMLH-1634854235%7C4%7CMCAAMB-1634854235%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1634256635s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C1202759587; li_a=AQJ2PTEmc2FsZXNfY2lkPTk2ODk1MjcwNyUzQSUzQTMxMTkwNzgwN6k-qC_VOfGfK4SZ1oQP_PsZwajs"
      },
      "referrer": "https://www.linkedin.com/sales/search/saved-searches/people",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors"
    });

   // salesApiPeopleSearch?q=peopleSearchQuery&start=0
  console.log("count: %d success: %d fail: %d", count, success, fail);
  const cof_filter = await result.json();
  if (cof_filter.status > 399) {
    console.log("Error fetching data: status: status ", cof_filter.status)
    return p_list;
  }
  let total = count;

  for (let i = 0; i < cof_filter['elements'].length ;i++) {
    try {
      let profileDict = {};
      let companyUrl = String(cof_filter['elements'][i].currentPositions[0].companyUrn).split(':')[3];
      let profileUrl = String(cof_filter['elements'][i].entityUrn).split(/[()]+/)[1];
      let linkedInProfileUrl = String(cof_filter['elements'][i].entityUrn).split(/[(),]+/)[1];

      profileDict['vmid'] = linkedInProfileUrl;
      profileDict['profileUrl'] = 'https://www.linkedin.com/in/' + profileUrl + '/';
      profileDict['fullname'] = cof_filter['elements'][i].fullName;
      profileDict['firstName'] = cof_filter['elements'][i].firstName;
      profileDict['lastName'] = cof_filter['elements'][i].lastName;
      profileDict['companyName'] = cof_filter['elements'][i].currentPositions[0].companyName;
      profileDict['title'] = cof_filter['elements'][i].currentPositions[0].title;

      if (companyUrl !== undefined) {
        profileDict['companyId'] = companyUrl;
        profileDict['companyUrl'] = 'https://www.linkedin.com/company/' + companyUrl + '/';
      } else {
        profileDict['companyId'] = undefined;
        profileDict['companyUrl'] = undefined;
      }

      profileDict['location'] = cof_filter['elements'][i].geoRegion;

      if (cof_filter['elements'][i].currentPositions[0].companyUrnResolutionResult !== undefined) {
        profileDict['industry'] = cof_filter['elements'][i].currentPositions[0].companyUrnResolutionResult.industry;
      } else {
        profileDict['industry'] = undefined;
      }

      if (cof_filter['elements'][i].profilePictureDisplayImage !== undefined) {
        profileDict['profileImageUrl'] = cof_filter['elements'][i].profilePictureDisplayImage.rootUrl +
          cof_filter['elements'][i].profilePictureDisplayImage.artifacts[0].fileIdentifyingUrlPathSegment;
      } else {
        profileDict['profileImageUrl'] = undefined;
      }

      if (cof_filter['elements'][i].currentPositions[0].startedOn !== undefined) {
        profileDict['month'] = cof_filter['elements'][i].currentPositions[0].startedOn.month;
        profileDict['year'] = cof_filter['elements'][i].currentPositions[0].startedOn.year;
      } else {
        profileDict['month'] = undefined;
        profileDict['year'] = undefined;
      }

      if (linkedInProfileUrl !== undefined) profileDict['linkedInProfileUrl'] = 'https://www.linkedin.com/in/' + linkedInProfileUrl + '/';
      else profileDict['linkedInProfileUrl'] = undefined;

      profileDict['summary'] = cof_filter['elements'][i].summary;
      profileDict['premium'] = cof_filter['elements'][i].premium;
      profileDict['timestamp'] = new Date().toISOString();

      p_list.push(profileDict);
      success++;
    }
    catch (err) {
      console.log(total + i, " Failed..: ", cof_filter['elements'][i].fullName);
      console.log(err);
      fail++;
    }
    count++;
  }
  console.log("Processed", success + fail, "/", cof_filter.paging.total, "LinkedIn profiles," +
              " success:", success, "failed:", fail);
  if (total + 100 > cof_filter.paging.total) {
    return p_list;
  }
  else {
    await sleep(5000);
    return await linkedInSearch(p_list, count, success, fail);
  }
}

const totalProfiles = await linkedInSearch(profileList,2400 , 0 , 0);
//console.log(totalProfiles);
//console.log("Total records:", totalProfiles.length);

'use strict';
let data = JSON.stringify(totalProfiles);
let filename = new Date().toISOString()
//console.log(filename)
fs.writeFile(filename +".json", data, function(err) {
  if(err) console.log('Error saving profiles ', err);
  else console.log('Profiles successfully saved!');
});
