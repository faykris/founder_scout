import fetch from 'node-fetch';
import sleep from "./sleep.js";

export default async function co_founders_search(p_list, geoId, count) { // filter by country: Colombia -> bingGeo:(includedValues:List((id:100876405))),
  const result = await fetch("https://www.linkedin.com/sales-api/salesApiPeopleSearch?" +
    "q=savedSearch&" +
    "savedSearchId=50540467&" +
    "newResultsOnly=true&start=" + String(count) + "&count=100&lastViewedAt=1635580962951", {
    "headers": {
      "accept": "*/*",
      "accept-language": "es-ES,es;q=0.9",
      "csrf-token": "ajax:3412942423165963119",
      "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-li-identity": "dXJuOmxpOm1lbWJlcjo5Mzc3NDc3ODk",
      "x-li-lang": "en_US",
      "x-li-page-instance": "urn:li:page:d_sales2_search_people_pivot_saved_delta;nXbg+fOZQy+9HkmKPMYNrA==",
      "x-restli-protocol-version": "2.0.0",
      "cookie": "li_sugr=248669f8-8a6c-4bfe-a600-5635dcdb011d; bcookie=\"v=2&61e76a31-c046-4d98-8c2c-8ee2f447df62\"; bscookie=\"v=1&20211006191210caa845ea-ad33-4bc8-8fc3-fb97e9f42056AQGf7FqLvk94GsVBhKyiNfSBpdHzOcOE\"; JSESSIONID=\"ajax:3412942423165963119\"; timezone=America/Bogota; _guid=9eb18b37-19a5-42f0-a5ba-dadba388e031; aam_uuid=41029341209754532414172781260508165292; AnalyticsSyncHistory=AQK1QzJBNoLc3gAAAXzIQxTG-NVtXKJjvXZiZowQq7FPGXJtHmoVzF5Ka7lsTRshtACp03kP3RtSynPwwk8VLA; lms_ads=AQGxiycwTLbJzgAAAXzIQxaTJdZ4zTHqgs4YuIs7Y-5jRbkjZz5VjgfkLu_b4U52FORB6Jic3sgrpKOMgg_F-OMRldm7Ao4n; lms_analytics=AQGxiycwTLbJzgAAAXzIQxaTJdZ4zTHqgs4YuIs7Y-5jRbkjZz5VjgfkLu_b4U52FORB6Jic3sgrpKOMgg_F-OMRldm7Ao4n; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18930%7CMCMID%7C40531383935555829624118433342738401127%7CMCAAMLH-1636214629%7C4%7CMCAAMB-1636214629%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1635617029s%7CNONE%7CMCCIDH%7C1202759587%7CvVersion%7C5.1.1; li_at=AQEDATfk5U0CW2KAAAABfNHxZhMAAAF89f3qE04AtYN5iGnLSzswMxDK6vqbR3dTT94kGhTKhe5A3BVEYZkZxOIvL0BTA9tZLeK3SvwP2PfCRfhgr15e3Xy_R39IAuMhygnNhOoRCs4zIVtM5aI2qvwr; liap=true; li_a=AQJ2PTEmc2FsZXNfY2lkPTk2ODk1MjcwNyUzQSUzQTMxMTkwNzgwN-YhRcB6hemnnBDZMJjj0LeM4mg6; fid=AQFooUm_5jAUkwAAAXzR8Yzdnqhjm9jbniohOn7rK3Fp7CkxthOALinCjvykLI-8PJSdcw7WN2Q5lg; lang=v=2&lang=en-us; UserMatchHistory=AQKsExSeYljVhgAAAXzR8ZPj33PFmMHRMCiuhKjf9DLl3ywXbmNVpmGBMdl0l5GW0CqIP-WhLwjlqXFrsw2DdTS0mJa9Xynsk1PvdYZ_pWv2M0dfrMQv6eG6Mu6qnphTgfGa5QsF6VtZVqCBrX6INE2ZNg21-r6PK9n16oFuBnAMhfiDQK_CCdlKlS3AkcJa2pFCkopVl8SI1CMG3IWA3rFFB46SbW6PJ9EJ9LaBHhmyoy8lzFJUP06QkLVMzROK0YeXtBGcnf4r7GQa2Fj2rUrfuwKklc1FoejL-cE; lidc=\"b=TB89:s=T:r=T:a=T:p=T:g=2676:u=9:x=1:i=1635609844:t=1635696113:v=2:sig=AQHBafJ1tDZgg4SzB-F4RXQhOqFeipgp\"",
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
