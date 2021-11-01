import fetch from 'node-fetch';
import sleep from "./sleep.js";

export default async function co_founders_search(p_list, geoId, count) { // filter by country: Colombia -> bingGeo:(includedValues:List((id:100876405))),
  const result = await fetch("https://www.linkedin.com/sales-api/salesApiPeopleSearch?" +
    "q=savedSearch&" +
    "savedSearchId=50500827&" +
    "newResultsOnly=true&" +
    "start="+ String(count) + "&" +
    "count=25&" +
    "lastViewedAt=1635285460632", {
    "headers": {
      "accept": "*/*",
      "accept-language": "es-ES,es;q=0.9",
      "csrf-token": "ajax:1501550627268510369",
      "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-li-identity": "dXJuOmxpOm1lbWJlcjo5NDE5OTA5NTU",
      "x-li-lang": "en_US",
      "x-li-page-instance": "urn:li:page:d_sales2_search_people_pivot_saved_delta;ixLEP1oNRAuTNart6fOwog==",
      "x-restli-protocol-version": "2.0.0",
      "cookie": "li_sugr=248669f8-8a6c-4bfe-a600-5635dcdb011d; bcookie=\"v=2&61e76a31-c046-4d98-8c2c-8ee2f447df62\"; bscookie=\"v=1&20211006191210caa845ea-ad33-4bc8-8fc3-fb97e9f42056AQGf7FqLvk94GsVBhKyiNfSBpdHzOcOE\"; timezone=America/Bogota; _guid=9eb18b37-19a5-42f0-a5ba-dadba388e031; aam_uuid=41029341209754532414172781260508165292; AnalyticsSyncHistory=AQLdFX9SWguE4AAAAXzb5nEOFaDnFjqSMwcmNnd_sx0TmRks5-6fD6t7z1goJs3QrbQSwfteXlkbuqI6KLJTZw; lms_ads=AQETFyiYFRIZqAAAAXzb5nKQFgybXZUV7QtfOnQX1qVh2oXOOilvMcVrEcl0JJBT3Y2sVZfj_YiNfUU_exfPwVSMsfxoOX65; lms_analytics=AQETFyiYFRIZqAAAAXzb5nKQFgybXZUV7QtfOnQX1qVh2oXOOilvMcVrEcl0JJBT3Y2sVZfj_YiNfUU_exfPwVSMsfxoOX65; PLAY_LANG=en; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; gpv_pn=www.linkedin.com%2Fpremium%2Fproducts%2F; s_ips=1312; s_tp=1312; s_cc=true; PLAY_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7InNlc3Npb25faWQiOiIzYjllNmQyMy03YmEyLTQzNzAtOTFmNC0wY2U0OTU5MDMxOTl8MTYzNTgwNzY5NSIsImFsbG93bGlzdCI6Int9IiwicmVjZW50bHktc2VhcmNoZWQiOiIiLCJyZWZlcnJhbC11cmwiOiJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJlbWl1bS9wcm9kdWN0cy8_aW50ZW50VHlwZT1GSU5EX0xFQURTJnVwc2VsbE9yZGVyT3JpZ2luPWd1ZXN0X2xvZ2luX3NhbGVzX25hdiIsIlJOVC1pZCI6InwwIiwicmVjZW50bHktdmlld2VkIjoiIiwiQ1BULWlkIjoiwqTCu1jChkPCtUzDt8Kvwq9cdTAwMTJqwr_DuD7DqyIsImV4cGVyaWVuY2UiOiIiLCJ0cmsiOiIifSwibmJmIjoxNjM1ODA3Nzc2LCJpYXQiOjE2MzU4MDc3NzZ9.6qALU--23z06u21t7DHg1CNIAM-1SzUOgydU8jMWFwQ; s_plt=1.38; s_pltp=www.linkedin.com%2Fpremium%2Fproducts%2F; s_ppv=www.linkedin.com%2Fpremium%2Fproducts%2F%2C100%2C100%2C1312%2C1%2C1; s_tslv=1635807775071; li_rm=AQGW2D_0wxuqCAAAAXzdyvkDhNrtA7jE6JDj-FLx791sz6TdTYr3e1WXdVJXe0Z7Pz-Km2AETH92QJC0gTbczmu-i1Q0ECzH83oz39pTceiBwE8VgujUB1C5; visit=v=1&M; fid=AQGnm0SYwzIEHAAAAXzdyyJn2oUj6oOvUSL8rM-TzkE8NOWVQQBVg6hopakcOvsxMi4Jstxj4u7sZg; fcookie=AQHFxN9vNq7ocgAAAXzdyzMhd5tCkn8BQeW_K8e5QAPmmw7S7qfaolKjV_SApnpTqwQC_1DJslVuZFcmf32DGHnH79UPkk9pK9JzHmclD9xX5B-wOFWexPb0l3GPgW55PE0EnT8J_qSnn45s-IPdkvqodkB9_QSzM36p7fT1CqCG5zXxlPyJo61BvSy_cm3QU0ofC0m7Q926KOdveuTHieM4sWunb-PbBq-qHR89CVJ-tjpHKx3AjP8LswZrsuBtmHsp/dT5uJF7nta6So1lXaSb/OG8lJXeOD6L1oPoMLGWJvC2IqZIQNK0DVYSvHILCEjCE2Tf1B4jVuIA==; g_state={\"i_p\":1635815877436,\"i_l\":1}; _gcl_au=1.1.622284.1635808713; liap=true; li_at=AQEDATglpCsEEde8AAABfN3N8xYAAAF9Adp3Fk4Ag7_sZLZqT3FiLvmcX7knEEPXXmDaW5WSNRfcY2_uaNpYmpZYJQWVeOrVazeg0CINmSGN7Ct6YF24Hn-MGVnID2eaM2MCQVo5cdmaZkiPnUHKARaj; JSESSIONID=\"ajax:1501550627268510369\"; lang=v=2&lang=en-us; UserMatchHistory=AQLOVNwq7_kv3wAAAXzdzkLOqarT_ShZVGw_ZABg644QfAG4ti8Y_gByv_o8uUPG0X5TeRktlaruGLfMEOqTGSC7eK2AQZy7cybVQ9yWKB-cJeU5jcsTpoaSkZYI8ZDowY-touwx5fpuogTrBEG6e7DJUWYILKqS-ppNxyt4t2sb7TKGH6cK5csX4N_mSIsyhMoNeutqmp5ACJW4f2dIkN2vt1hipBT4ihhrxrldilK_8yb8_p2ZNGBw1IXGzQHUdEEIiivuz6FoWGysVKsM8dXAFVCEc_RU2P5JGyU; lidc=\"b=TB55:s=T:r=T:a=T:p=T:g=3035:u=4:x=1:i=1635808856:t=1635895129:v=2:sig=AQGB3oczTqrUqwrLe6HNfMz9y171zJCL\"; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18933%7CMCMID%7C40531383935555829624118433342738401127%7CMCAAMLH-1636413655%7C4%7CMCAAMB-1636413655%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1635816055s%7CNONE%7CMCCIDH%7C-616281000%7CvVersion%7C5.1.1; li_a=AQJ2PTEmc2FsZXNfY2lkPTk3NjE4MDgwNyUzQSUzQTMxNTk2MTYwNx7G956omPMKKPGtCyJxLxp4lHL8",
      "Referer": "https://www.linkedin.com/sales/search/saved-searches/people",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });

  const min = 5;
  const max = 30;

  const cof_filter = await result.json();
  if (cof_filter.status > 399) {
    console.log("Error fetching data: status ", cof_filter.status)
    return p_list;
  }

  for (let i = 0; i < cof_filter['elements'].length; i++) {
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
    return await co_founders_search(p_list, geoId, count);
  }
}
