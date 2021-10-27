import fetch from 'node-fetch';
import sleep from "./sleep.js";

export default async function co_founders_search(p_list, geoId, count) { // filter by country: Colombia -> bingGeo:(includedValues:List((id:100876405))),
  const result = await fetch("https://www.linkedin.com/sales-api/salesApiPeopleSearch?" +
    "q=savedSearch&" +
    "savedSearchId=50500115&" + "newResultsOnly=true&" + "start=" + String(count) +
    "&count=100&" + "lastViewedAt=1635258814695", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "csrf-token": "ajax:6514367558591851145",
      "sec-ch-ua": "\"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Linux\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-li-identity": "dXJuOmxpOm1lbWJlcjo5NDE5OTA5NTU",
      "x-li-lang": "en_US",
      "x-li-page-instance": "urn:li:page:d_sales2_search_people_pivot_saved_delta;W1IJGd5VR4GlLY+qHpW7zA==",
      "x-restli-protocol-version": "2.0.0",
      "cookie": "li_sugr=3f85b1fc-ea23-417b-babd-ded06ce09694; bcookie=\"v=2&acb0ab51-478e-4faa-819a-ac7c23fb853a\"; bscookie=\"v=1&20210905232313a1fb4eca-97f2-4e4f-8bd9-a5dcdbcaf247AQEDFCuzVoxD5ewuYiOiyDPCCsM8Vqzh\"; aam_uuid=70217657370447217862075267279885908151; timezone=America/Bogota; s_fid=7CD8F46604ABDD82-28F45EC741951DCB; _gcl_au=1.1.470399711.1633909461; li_rm=AQHpePiVPegsCgAAAXyEzr6fkLKqtOEuGveSPtl7anMDdoLsy43QoWdtHD6y8x1_uhOsiJ_tJLVeIgui5X1IYQHSI2UwKTV7C2aZgHmAikhgL0X9bDKskK_tSl409R3LIecBu5qMZAb4zMJItsp_3R-vB1t9J1vxbklsavB1vx1l0bEcb4pdP2nRCiXoX5jgwLFXmNlXfxZ2OBHlPPqXJoSnTwwrIUOdHODqlwbAe6BRyjCvlW_Fr9EPOR0xmoa7LqWHLTm3Kpm-PcvEEi5OFwF6WfxOOXHga6qMxtSnJ9pGVaS0P6MnU-uNy6vbWbnkMlxYiIqsZroW_7KKV3A; li_theme=system; __ssid=d8be94cc-fd36-4c18-9dcc-0034faada79f; _ga=GA1.2.2111367483.1634316095; dfpfpt=2d151106630c4b2095f4a03296ef8477; u_tz=GMT-05:00; VID=V_2021_10_15_17_753; mbox=PC#35c29004303940afbfdcb00e26b03a35.34_0#1649870273|session#1a6cd023273144c08d220dd101d1221e#1634318916; visit=v=1&M; li_er=v=1&r=urn:li:contract:369486696&t=1632786169397&g=MDIxrVzVg6/m7QqBk4f18mdxnaPwdTfEYUvVxDDTxExtBXs=; cap_session_id=3689516816:1; g_state={\"i_l\":0}; gpv_pn=www.linkedin.com%2Fpremium%2Fproducts%2F; s_tslv=1635183178679; li_at=AQEDATglpCsF8e0ZAAABfLmZuvMAAAF83aY-800AH9GMs0SZcT6dQRFH9W-hZSJn2zn6oCNs9HRPTJrBmiB2j3_PuaTaeSDfUc4SOVfqxopd4n2RKEp5Px00ZoJ1aWfcLkNr3H28ic-xJU1vEIF1NeZ9; liap=true; JSESSIONID=\"ajax:6514367558591851145\"; lang=v=2&lang=en-us; li_a=AQJ2PTEmc2FsZXNfY2lkPTk3NjE4MDgwNyUzQSUzQTMxNTk2MTYwN0EwDNVOFzAOiJHVhejKFExKJmYV; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; lidc=\"b=TB55:s=T:r=T:a=T:p=T:g=3029:u=4:x=1:i=1635263624:t=1635350024:v=2:sig=AQEvXEnjCdAHPZD0rLbOW18AMrX_dHCp\"; UserMatchHistory=AQLAVQ19LAF15AAAAXy-bSEdDlilZ3Vdl3WwYRYP1EqUxfj9Oe6R2T_YHZ-mT0K8RzJpgwvrZR9csx8LeWMXPIRCV2OgyXFPbHqrOrASjYIymQbVpFebj1jlbSMsELXIQRDJneA3AGK0o54BUzEWNfs7-AjRpcc6HXliGBs7m3XYEtCj0VyDrN8ylv7T2kZSuqfCoFW3mo1lfN1BGAExPxTSrec0FdgdwO1rOvP7vZOq-5K224hcgbN4c6M3ZroJHDUX8tR8GEU_xwOKYzRMwpSFrUuOYp9_sRHL37Q; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18926%7CMCMID%7C70429233835449844972018733740781849468%7CMCAAMLH-1635887196%7C4%7CMCAAMB-1635887196%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1635289596s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C-616281000",
      "Referer": "https://www.linkedin.com/sales/search/saved-searches/people",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });

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
