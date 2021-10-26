import fetch from 'node-fetch';
import sleep from "./sleep.js";

export default async function co_founders_search(p_list, geoId, count) { // filter by country: Colombia -> bingGeo:(includedValues:List((id:100876405))),
  const result = await fetch("https://www.linkedin.com/sales-api/salesApiPeopleSearch?" +
    "q=savedSearch&" +
    "savedSearchId=50541275&" +
    "newResultsOnly=true&" +
    "start="+ String(count) +"&" +
    "count=25&" +
    "lastViewedAt=1635184707516", {
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
      "x-li-page-instance": "urn:li:page:d_sales2_search_people_pivot_saved_delta;1OSzaTOdTkCdGJ+uVEzzhw==",
      "x-restli-protocol-version": "2.0.0",
      "cookie": "li_sugr=248669f8-8a6c-4bfe-a600-5635dcdb011d; bcookie=\"v=2&61e76a31-c046-4d98-8c2c-8ee2f447df62\"; bscookie=\"v=1&20211006191210caa845ea-ad33-4bc8-8fc3-fb97e9f42056AQGf7FqLvk94GsVBhKyiNfSBpdHzOcOE\"; liap=true; JSESSIONID=\"ajax:3412942423165963119\"; timezone=America/Bogota; _guid=9eb18b37-19a5-42f0-a5ba-dadba388e031; aam_uuid=41029341209754532414172781260508165292; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18920%7CMCMID%7C40531383935555829624118433342738401127%7CMCAAMLH-1635268010%7C4%7CMCAAMB-1635268010%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1634670410s%7CNONE%7CMCCIDH%7C1202759587%7CvVersion%7C5.1.1; li_at=AQEDATfk5U0AwT9rAAABfIl6tR0AAAF815o2aU0AIxHDuRNuuCesLS_do46-QGea5RcyB2c1zxAtfYQPcuM28XdJQ7N0r8hN-5PyZCqCH7bPPOvtAm2BHoudEcASge2Ui5eGnDpfErVppWJ_cTHoBIEa; fid=AQE37cJpm_6i0wAAAXy32YFX3A0eQogTeqwy6EvzFIwHkj6Y0nJe0fbRD1lo2cqjuiJfdTleO2lToA; lang=v=2&lang=en-us; UserMatchHistory=AQLLpxEuYQXUSAAAAXy4qCPX-bBA3kdCBi9EW0amBNAzmgERnpoq82CCqCLFpZ0YZkJ6uudP2j3PtiuExytHntaAhnKq3AVE2jEIHcf4asCXkqUTaB-E6P87ULydpeeypFm7KSfbDBLLCVu8RjgPV_DnEimUaXfndpZPCVBe_GPIBjabYHzoa46kfbdl0g8SDh9sD02_bSDDhmBgBKuGGk7NfndgYQwfDgwmxFbtEkj4rVrhqaY2GBFZkE3qucBOLE81mfYhP3WmVAg9okaJA3c2V9ebl1diigF7o0I; AnalyticsSyncHistory=AQKta_UMIwTMqAAAAXy4qCPXM7IaXFRNbWR-ABE6QhcW_-bxpDLy1S0Gvu-CU6Zw9B444NixKGzuGVNfG5RBTg; lms_ads=AQH9YUKf5AmSYAAAAXy4qCVCrJBwdx2oNdH5Li-rhLBacp750ixfHa53FaCMjCVv38T6cjcZsFQtFzZTWcE30yYOgsxApTPX; lms_analytics=AQH9YUKf5AmSYAAAAXy4qCVCrJBwdx2oNdH5Li-rhLBacp750ixfHa53FaCMjCVv38T6cjcZsFQtFzZTWcE30yYOgsxApTPX; lidc=\"b=TB89:s=T:r=T:a=T:p=T:g=2671:u=7:x=1:i=1635185674:t=1635268925:v=2:sig=AQHXO5vTbdEf0B1p4SAsFPUPnj44D6ZI\"; li_a=AQJ2PTEmc2FsZXNfY2lkPTk2ODk1MjcwNyUzQSUzQTMxMTkwNzgwNwTuBj_cbTq3QpkUpmWQ_Xy_nKg2"
    },
    "referrer": "https://www.linkedin.com/sales/search/saved-searches/people",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
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
