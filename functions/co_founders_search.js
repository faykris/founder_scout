import fetch from 'node-fetch';
import sleep from "./sleep.js";

export default async function co_founders_search(p_list, geoId, count) { // filter by country: Colombia -> bingGeo:(includedValues:List((id:100876405))),
  const result = await fetch("https://www.linkedin.com/sales-api/salesApiPeopleSearch?" +
    "q=savedSearch&" +
    "savedSearchId=50541275&" +
    "newResultsOnly=true&" +
    "start=" + String(count) + "&" +
    "count=100&" +
    "lastViewedAt=" + String(Date.now()).substr(0,10), {
    "headers": {
      "accept": "*/*",
      "accept-language": "es-ES,es;q=0.9",
      "csrf-token": "ajax:3412942423165963119",
      "sec-ch-ua": "\"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-li-identity": "dXJuOmxpOm1lbWJlcjo5Mzc3NDc3ODk",
      "x-li-lang": "en_US",
      "x-li-page-instance": "urn:li:page:d_sales2_search_people_pivot_saved_delta;DUeYU55sRCyapwh3ofLLbw==",
      "x-restli-protocol-version": "2.0.0",
      "cookie": "li_sugr=248669f8-8a6c-4bfe-a600-5635dcdb011d; bcookie=\"v=2&61e76a31-c046-4d98-8c2c-8ee2f447df62\"; bscookie=\"v=1&20211006191210caa845ea-ad33-4bc8-8fc3-fb97e9f42056AQGf7FqLvk94GsVBhKyiNfSBpdHzOcOE\"; fcookie=AQGDRerWJbatZgAAAXyJerSofe5fdTVf2dbwSpfdfKkgBN_K-lRRo-cUMCKG47PM4aviCJC89rPSUA3cxdVmMw3VyUrICh6RHod2WENHc0hVJ6xc6ddy3ZDTzePmurOuO8Sn6zW82mtDy6H5pv6bNalNm-XOyrWxkbmUHflIlUOFJAf9J6hK3VVbwSv7y2i2G-99vsK6LyuZcnpCSug8j0eXD0LGr3A2MnseSMUpVV1YrDEco7Dl4E8ZGpU0a-mn-seLDAgxb8+78WAjtyX/5ptVxVAqArCVJY6rcQkAmPD2nwttDVZW5eqevyw1I+6Qo4OcYfQY+R3SDTGsRFXBAc/zDHlg==; li_at=AQEDATfk5U0AwT9rAAABfIl6tR0AAAF8rYc5HU0AQ-SzGCo_6E1piIH2HHTLdwP3DH2_Y9_JGTyKwyRx8zgWIrQ526uPWi8MQksBF0p99ejug3p2VNwU2u-pUBLGd7pbDELSA19HK5F9Z8gj-F-mWIHY; liap=true; JSESSIONID=\"ajax:3412942423165963119\"; timezone=America/Bogota; _guid=9eb18b37-19a5-42f0-a5ba-dadba388e031; aam_uuid=41029341209754532414172781260508165292; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18920%7CMCMID%7C40531383935555829624118433342738401127%7CMCAAMLH-1635268010%7C4%7CMCAAMB-1635268010%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1634670410s%7CNONE%7CMCCIDH%7C1202759587%7CvVersion%7C5.1.1; AnalyticsSyncHistory=AQLWmDur7oHzLwAAAXyozaJy0cdhEsjZ64JDWeLnEa6vQUi6EgqG8L-n3FsabnLmzbFvrwv9mIQI7uH8ErYDRg; lms_ads=AQHNNwUeh46lsAAAAXyozaMlC4He5JJwKk7vrskLZhZJ_U4WaKfj67fWUmBbvGOm8jyJ-8WCO50hNNDnQrjlQTAsxZbexLfH; lms_analytics=AQHNNwUeh46lsAAAAXyozaMlC4He5JJwKk7vrskLZhZJ_U4WaKfj67fWUmBbvGOm8jyJ-8WCO50hNNDnQrjlQTAsxZbexLfH; fid=AQGAyoYGU453ZwAAAXyp75DDLTJtCUZSLpWj9ocr8tcy06ItiZXuj5l6a1Icw0FYFanx8ZqzOhIQvA; lang=v=2&lang=en-us; UserMatchHistory=AQJzViivZZWGvAAAAXyp75iBpMCjZhIKT19azTdlYd9E8NpNY0kvJglF-ZBnVDcZcHYPfdUe8qYfvWiNoau_TT81fupr6Bdg27KrUcys8dTOxcRrwKfjsJyxJH6P7LSIDi0ybnznXTDAvg9mmFisBbFHqU9AvVG5rtD2sH1Y1_ONrDO7Nkus4F4gMwzJVzNwzKk4UQA5xnGKOlGWAPvdYDG1MXff1sLEJIVRvb0f9fwYPeOhm_y-mjTnHQBWJAWgVDYzzYXWipe21nom98woxk7Tt5KFOfdGHj4ixFU; lidc=\"b=TB89:s=T:r=T:a=T:p=T:g=2670:u=7:x=1:i=1634938625:t=1635025022:v=2:sig=AQHG7f-axXZ3qMU3iaMDw0CJaxGXLaPB\"; li_a=AQJ2PTEmc2FsZXNfY2lkPTk2ODk1MjcwNyUzQSUzQTMxMTkwNzgwNwTuBj_cbTq3QpkUpmWQ_Xy_nKg2"
    },
    "referrer": "https://www.linkedin.com/sales/search/saved-searches/people",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  });
  console.log(String(Date.now()));

  const min = 5;
  const max = 30;
  // salesApiPeopleSearch?q=peopleSearchQuery&start=0
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
