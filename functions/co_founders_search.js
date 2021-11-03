import fetch from 'node-fetch';
import sleep from "./sleep.js";

export default async function co_founders_search(p_list, geoId, count) { // filter by country: Colombia -> bingGeo:(includedValues:List((id:100876405))),
  const result = await fetch("https://www.linkedin.com/sales-api/salesApiPeopleSearch?" +
    "q=savedSearch&" +
    "savedSearchId=50500827&" +
    "newResultsOnly=true&" +
    "start=" + String(count) + "&" +
    "count=100&" +
    "lastViewedAt=1635811278804", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9,es-ES;q=0.8,es;q=0.7",
      "csrf-token": "ajax:5493513388572147008",
      "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-li-identity": "dXJuOmxpOm1lbWJlcjo5NDE5OTA5NTU",
      "x-li-lang": "en_US",
      "x-li-page-instance": "urn:li:page:d_sales2_search_people_pivot_saved_delta;qlbu9mlbS8eyqqd3c11HTQ==",
      "x-restli-protocol-version": "2.0.0",
      "cookie": "li_sugr=248669f8-8a6c-4bfe-a600-5635dcdb011d; bcookie=\"v=2&61e76a31-c046-4d98-8c2c-8ee2f447df62\"; bscookie=\"v=1&20211006191210caa845ea-ad33-4bc8-8fc3-fb97e9f42056AQGf7FqLvk94GsVBhKyiNfSBpdHzOcOE\"; timezone=America/Bogota; _guid=9eb18b37-19a5-42f0-a5ba-dadba388e031; aam_uuid=41029341209754532414172781260508165292; AnalyticsSyncHistory=AQLdFX9SWguE4AAAAXzb5nEOFaDnFjqSMwcmNnd_sx0TmRks5-6fD6t7z1goJs3QrbQSwfteXlkbuqI6KLJTZw; lms_ads=AQETFyiYFRIZqAAAAXzb5nKQFgybXZUV7QtfOnQX1qVh2oXOOilvMcVrEcl0JJBT3Y2sVZfj_YiNfUU_exfPwVSMsfxoOX65; lms_analytics=AQETFyiYFRIZqAAAAXzb5nKQFgybXZUV7QtfOnQX1qVh2oXOOilvMcVrEcl0JJBT3Y2sVZfj_YiNfUU_exfPwVSMsfxoOX65; gpv_pn=www.linkedin.com%2Fpremium%2Fproducts%2F; s_tslv=1635807775071; li_rm=AQGW2D_0wxuqCAAAAXzdyvkDhNrtA7jE6JDj-FLx791sz6TdTYr3e1WXdVJXe0Z7Pz-Km2AETH92QJC0gTbczmu-i1Q0ECzH83oz39pTceiBwE8VgujUB1C5; visit=v=1&M; fcookie=AQHFxN9vNq7ocgAAAXzdyzMhd5tCkn8BQeW_K8e5QAPmmw7S7qfaolKjV_SApnpTqwQC_1DJslVuZFcmf32DGHnH79UPkk9pK9JzHmclD9xX5B-wOFWexPb0l3GPgW55PE0EnT8J_qSnn45s-IPdkvqodkB9_QSzM36p7fT1CqCG5zXxlPyJo61BvSy_cm3QU0ofC0m7Q926KOdveuTHieM4sWunb-PbBq-qHR89CVJ-tjpHKx3AjP8LswZrsuBtmHsp/dT5uJF7nta6So1lXaSb/OG8lJXeOD6L1oPoMLGWJvC2IqZIQNK0DVYSvHILCEjCE2Tf1B4jVuIA==; g_state={\"i_p\":1635815877436,\"i_l\":1}; _gcl_au=1.1.622284.1635808713; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18933%7CMCMID%7C40531383935555829624118433342738401127%7CMCAAMLH-1636413655%7C4%7CMCAAMB-1636413655%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1635816055s%7CNONE%7CMCCIDH%7C-616281000%7CvVersion%7C5.1.1; G_ENABLED_IDPS=google; li_at=AQEDATglpCsEXfYGAAABfN44Vb0AAAF9AkTZvU4AtPuQjtooBPi9DqG5HBZRRiUFN8FCT-25eMOPZn-1GsgxVzMUSV55dfADnSgz-fY2QER4VrLr7PUIUvI5PautMii1Ev95ZADN8ZolOKi78v0yUUwm; liap=true; JSESSIONID=\"ajax:5493513388572147008\"; fid=AQFZ3khG54rt1AAAAXzg705gC0TkTvSfbCLJaBeRHsVgRmHYN59xBPW_D8HWzbp97Cq3BzXAJoUrXA; UserMatchHistory=AQKMqbBbAj6PGQAAAXzkDCQznhsRUaWzHVC0sU6z2dt9Fa4tiHczpYsqXK4QOz7TJ4vWZBpbWLK1njPXO0gn1JU61vNRRZWKGIVqWG1GCGmSYQ1ubEdB9_FyKQXRqSGOzdR1d24xZopFHButxLaURwQ4fhAg227dStGCwCfxEaKcpbBMH_Vy9yvSuk8rROPahNNteq8TWwr8JXtPdP4sIj9tE8n2xViPEmWd-dNNTYO3sW5r2I2bTSe6yj5w9DhSVi24_e0TIocZ9glgzpvgQCZaff9SF8yrudXanfs; lang=v=2&lang=en-us; lidc=\"b=TB55:s=T:r=T:a=T:p=T:g=3035:u=6:x=1:i=1635948783:t=1636035167:v=2:sig=AQHunQ3XytiUfW_ohNX_QVl-UwSRTwn8\"; li_a=AQJ2PTEmc2FsZXNfY2lkPTk3NjE4MDgwNyUzQSUzQTMxNTk2MTYwN8upBtn7iKAW1ZRWDzRB5cTkUimG",
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
