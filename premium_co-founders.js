import fetch from 'node-fetch';
import fs from 'fs';


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function linkedInSearch(p_list, count) { // filter by country: Colombia -> bingGeo:(includedValues:List((id:100876405))),
  const result = await fetch("https://www.linkedin.com/sales-api/salesApiPeopleSearch?" +
    "q=peopleSearchQuery&" +
    "start="+ String(count) + "&" +
    "count=100&" +
    "query=(companySize:List(B)," +
            "doFetchHeroCard:false," +
            "bingGeo:(includedValues:List((id:103323778)))," +
            "recentSearchParam:(doLogHistory:true)," +
            "spotlightParam:(selectedType:ALL)," +
            "titleV2:(scope:CURRENT,includedValues:List((text:Co-Founder,id:103)))," +
            "tenureAtCurrentCompany:List(1)," +
            "tenureAtCurrentPosition:List(1)," +
            "trackingParam:(sessionId:1MuzrhWbSC2zjyMiJhKnbw==)," +
            "doFetchFilters:true," +
            "doFetchHits:true,doFetchSpotlights:true)&" +
    "decorationId=com.linkedin.sales.deco.desktop.search.DecoratedPeopleSearchHitResult-10", {
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
      "x-li-page-instance": "urn:li:page:d_sales2_search_people;kbw6DB6VRJWef0ievj6Xeg==",
      "x-restli-protocol-version": "2.0.0",
      "cookie": "li_sugr=f158f3ac-77e6-447e-b2af-9545fc5d9e06; bcookie=\"v=2&c9eb21a4-fc2f-4f29-8659-b41b16dd4ecf\"; bscookie=\"v=1&20211001172434d70910a8-e1cc-49e9-8aa0-0ecff8027596AQFEM3tpoixToYXNm3jTfcXXrkcKWORt\"; aam_uuid=40577756698522595741660832106329087972; g_state={\"i_p\":1633116282895,\"i_l\":1}; _gcl_au=1.1.685508982.1633109242; timezone=America/Bogota; _guid=0fcb2493-f4c3-46d2-9ca0-1ca73e9ccc95; __ssid=aadffd93-2af2-4702-a697-ec3571abb081; _ga=GA1.2.1481398525.1633109501; dfpfpt=d88a4d9619c74e1a8a91bbb653ca0471; li_rm=AQENfHtB8yo-BQAAAXw8-eleeGwbNTt6zKYjMjYBqdE2ZSESsoHTQoBG2X1AlNE9SnFtJADOYuNtVjJlnamAjlv8ihEg4mLqXf-6_wvmOpYuCjr6I9B0TCDa; JSESSIONID=\"ajax:3228420206501524135\"; G_ENABLED_IDPS=google; AnalyticsSyncHistory=AQIWmjq1wTdImwAAAXx6oVO3FwNZmgyu7cZPOARgwIAu-KHJEUNOnbOsiRRH0TBqUNsvQzg0Lsua4kTiuQI8FQ; lms_ads=AQGx-otjPXkkdQAAAXx6oVT5qLfiSlzkhVCQZGCJf8zVU9mOyoifU8s1Ak8vXGzyO4FZW6rwVwYT-aob6QNhStM0aYW8a4dj; lms_analytics=AQGx-otjPXkkdQAAAXx6oVT5qLfiSlzkhVCQZGCJf8zVU9mOyoifU8s1Ak8vXGzyO4FZW6rwVwYT-aob6QNhStM0aYW8a4dj; spectroscopyId=d02aaf7c-d4f7-4dd4-bca6-09acaa7cf8ca; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18916%7CMCMID%7C40800350625631250531712310401552477231%7CMCAAMLH-1634920946%7C4%7CMCAAMB-1634920946%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1634323346s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C1202759587; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; _gid=GA1.2.1674209641.1634316611; at_check=true; s_ips=1269; s_cc=true; visit=\"v=1&M\"; liap=true; li_at=AQEDATfk5U0C9YuoAAABfITedaMAAAF8qOr5o04AZ0kv_pSlBDEVFyO7S8ebc6i9mVexd_wWfDH2bn-Nptr-uGrzXtYJ5VuvSzsnHEhkmEWLRvO4QoemXqf4f08YqN4l67n2Pwm7ZM6ILIgzQrCa-iVa; cap_session_id=3688678656:1; li_er=v=1&r=urn:li:contract:369488136&t=1632613776803&g=MDIxBVpKQAnHlsYnTW3Pnu5ew2jxltPKFBvgp5f5IHIs2rg=; u_tz=GMT-05:00; li_a=AQJ2PTEmc2FsZXNfY2lkPTk2ODk1MjcwNyUzQSUzQTMxMTkwNzgwN1qQvw5-u1bX_am5TBIKSpUr0IeW; PLAY_LANG=es; PLAY_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7InNlc3Npb25faWQiOiIyZTkwN2JlNy1iMjZlLTQwNWMtYWI3ZC04ZTIwNTExYWM2MmZ8MTYzNDMxNzI2OSIsImFsbG93bGlzdCI6Int9IiwicmVjZW50bHktc2VhcmNoZWQiOiIiLCJyZWZlcnJhbC11cmwiOiJodHRwczovL3d3dy5nb29nbGUuY29tLyIsImFpZCI6IiIsIlJOVC1pZCI6InwwIiwicmVjZW50bHktdmlld2VkIjoiMTE3MDg0IiwiQ1BULWlkIjoiWMK0wo1hw5NSXHUwMDBFwovCtGbCpzUzXHUwMDExV8OOIiwiZXhwZXJpZW5jZSI6ImVudGl0eSIsImlzX25hdGl2ZSI6ImZhbHNlIiwidHJrIjoiIn0sIm5iZiI6MTYzNDMxNzI3MSwiaWF0IjoxNjM0MzE3MjcxfQ.4l0i3Wo17WQp2ekBXdQfSqHu8YxQyYmqtm3suQijZ9Q; lang=v=2&lang=en-us; SID=cac27ffe-3b8b-4ee9-9406-bef2f2ff3116; VID=V_2021_10_15_17_481; _gac_UA-62256447-1=1.1634317525.EAIaIQobChMI4YyzmfPM8wIVA7LICh30uALsEAAYASAAEgKWhPD_BwE; mbox=session#4850ee71148e4e80b241a0b8105fbe67#1634318510|PC#4850ee71148e4e80b241a0b8105fbe67.34_0#1649869525; gpv_pn=business.linkedin.com%2Fes-es%2Fsales-solutions%2Fcx%2Flinkedin-sales-navigator; _gcl_aw=GCL.1634317525.EAIaIQobChMI4YyzmfPM8wIVA7LICh30uALsEAAYASAAEgKWhPD_BwE; _gcl_dc=GCL.1634317525.EAIaIQobChMI4YyzmfPM8wIVA7LICh30uALsEAAYASAAEgKWhPD_BwE; s_plt=3.86; s_pltp=business.linkedin.com%2Fes-es%2Fsales-solutions%2Fcx%2Flinkedin-sales-navigator; s_tp=2906; s_tslv=1634317544786; s_ppv=business.linkedin.com%2Fes-es%2Fsales-solutions%2Fcx%2Flinkedin-sales-navigator%2C100%2C44%2C2906%2C2%2C2; UserMatchHistory=AQK-9f9Ut2XlqQAAAXyE_HBhFS9DDGMNoFmEOBGUCcgWf3Q5RjCxAj5FX6TH-sZR_Nedw2j4xHahXncTNHu5XER9t-VeSTnppZnlWafNrXZi6M0KKeUFz8KvAPeraUMPNtiK9_Y72E_08HQxedMO6ndvnwOwWbWf2Uh0TOi2lvP9vuLD1NrC8RIdG4P73KB9eWBALMpM4BPqmqFzfOa1BLl2x5HBfRwR4y3ANHC77_CY0_8ZbRo5MLGaU5B138eh6eEwR8uH_ruImtos55qQ38WVpRYjH4UXydcEaq0; lidc=\"b=TB89:s=T:r=T:a=T:p=T:g=2665:u=7:x=1:i=1634318710:t=1634389270:v=2:sig=AQGlx5BfiDAHkPQrQuUKYdYMC4SYzozQ\"; sdsc=1%3A1SZM1shxDNbLt36wZwCgPgvN58iw%3D"
    },
    "referrer": "https://www.linkedin.com/sales/search/people?companySize=B&geoIncluded=103644278%2C101174742%2C106057199%2C103323778%2C100446943%2C100876405%2C102927786%2C104621616%2C106373116&logHistory=true&savedSearchId=50541275&searchSessionId=1MuzrhWbSC2zjyMiJhKnbw%3D%3D&spellingCorrectionEnabled=false&tenureAtCurrentCompany=1&tenureAtCurrentPosition=1&titleIncluded=Co-Founder%3A103&titleTimeScope=CURRENT",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  });

  const min = 5;
  const max = 30;
   // salesApiPeopleSearch?q=peopleSearchQuery&start=0
  const cof_filter = await result.json();
  if (cof_filter.status > 399) {
    console.log("Error fetching data: status ", cof_filter.status)
    return p_list;
  }

  for (let i = 0; i < cof_filter['elements'].length ;i++) {
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
    }
    profileDict['location'] = cof_filter['elements'][i].geoRegion;
    if (cof_filter['elements'][i].currentPositions[0].companyUrnResolutionResult !== undefined) {
      profileDict['industry'] = cof_filter['elements'][i].currentPositions[0].companyUrnResolutionResult.industry;
    }
    if (cof_filter['elements'][i].profilePictureDisplayImage !== undefined) {
      profileDict['profileImageUrl'] =
        cof_filter['elements'][i].profilePictureDisplayImage.rootUrl +
        cof_filter['elements'][i].profilePictureDisplayImage.artifacts[0].fileIdentifyingUrlPathSegment;
    }
    if (cof_filter['elements'][i].currentPositions[0].startedOn !== undefined) {
      profileDict['month'] = cof_filter['elements'][i].currentPositions[0].startedOn.month;
      profileDict['year'] = cof_filter['elements'][i].currentPositions[0].startedOn.year;
    }
    if (linkedInProfileUrl !== undefined) {
      profileDict['linkedInProfileUrl'] = 'https://www.linkedin.com/in/' + linkedInProfileUrl + '/';
    }
    profileDict['summary'] = cof_filter['elements'][i].summary;
    profileDict['premium'] = cof_filter['elements'][i].premium;
    profileDict['timestamp'] = new Date().toISOString();

    p_list.push(profileDict);
    count++;
  }

  console.log("Processed", count, "/", cof_filter.paging.total, "LinkedIn profiles");
  if (count >= cof_filter.paging.total) {
    return p_list;
  }
  else {
    const time = (Math.random() * (max - min) + min).toFixed();
    console.log('---> Scraping the following profiles in ' + time + ' seconds... ');
    await sleep(time * 1000);
    return await linkedInSearch(p_list, count);
  }
}

let profileList = [];
// **** Execute profile scraper function ****
const totalProfiles = await linkedInSearch(profileList,0);

'use strict';
let data = JSON.stringify(totalProfiles);
let filename = new Date().toISOString()

fs.writeFile(filename +".json", data, function(err) {
  if(err) console.log('Error saving profiles ', err);
  else console.log('Profiles successfully saved!');
});
