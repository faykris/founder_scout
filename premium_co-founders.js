import fetch from 'node-fetch';
import fs from 'fs';


let profileList = [];
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function linkedInSearch(p_list, count, success, fail) { // filter by country: Colombia -> bingGeo:(includedValues:List((id:100876405))),
  const result = await fetch(
    "https://www.linkedin.com/sales-api/salesApiPeopleSearch?" +
        "q=peopleSearchQuery&" +
        "start="+ String(count) +"&" +
        "count=100&" +
        "query=(bingGeo:(includedValues:List((id:100876405)))" +
               "doFetchHeroCard:false," +
               "recentSearchParam:(doLogHistory:true,id:1075889658)," +
               "spellCorrectionEnabled:true," +
               "spotlightParam:(selectedType:ALL)," +
               "titleV2:(scope:CURRENT,includedValues:List((text:Co-Founder,id:103)))," +
               "tenureAtCurrentCompany:List(1)," +
               "tenureAtCurrentPosition:List(1)," +
               "trackingParam:(sessionId:y6rrEvTCSGGBSrFoR3Nu9Q==)," +
               "doFetchFilters:true," +
               "doFetchHits:true," +
               "doFetchSpotlights:true)&" +
        "decorationId=com.linkedin.sales.deco.desktop.search.DecoratedPeopleSearchHitResult-10", {
    headers: {
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
      "x-li-page-instance": "urn:li:page:d_sales2_search_people;jBcjkeVqSRKkwJ6i1KNfFw==",
      "x-restli-protocol-version": "2.0.0",
      "cookie": "li_sugr=f158f3ac-77e6-447e-b2af-9545fc5d9e06; bcookie='v=2&c9eb21a4-fc2f-4f29-8659-b41b16dd4ecf'; bscookie='v=1&20211001172434d70910a8-e1cc-49e9-8aa0-0ecff8027596AQFEM3tpoixToYXNm3jTfcXXrkcKWORt'; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; aam_uuid=40577756698522595741660832106329087972; g_state={'i_p':1633116282895,'i_l':1}; _gcl_au=1.1.685508982.1633109242; liap=true; timezone=America/Bogota; spectroscopyId=70bda93a-e97b-4cd0-84af-872a8fe92a3b; _guid=0fcb2493-f4c3-46d2-9ca0-1ca73e9ccc95; AnalyticsSyncHistory=AQIeeBcEIVk-DwAAAXw85hYVWH9qoqxPFbav4fo8SoNI9MMrXmS34cvri7FQz05NMYJARbZPuJdo16Gpe7FAZQ; lms_ads=AQFRDemKv476qAAAAXw85hbnHT-17iA7IjVx4__SEqu7Zp5VuUTrzNuoMI4DcrMybA3MU7ko_f0rRpkUB9sIcMD6B7WnDvVh; lms_analytics=AQFRDemKv476qAAAAXw85hbnHT-17iA7IjVx4__SEqu7Zp5VuUTrzNuoMI4DcrMybA3MU7ko_f0rRpkUB9sIcMD6B7WnDvVh; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18902%7CMCMID%7C40800350625631250531712310401552477231%7CMCAAMLH-1633714083%7C4%7CMCAAMB-1633714083%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1633116483s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C1202759587; sdsc=22%3A1%2C1633109389679%7EJBSK%2C04IpLsRTidkl8%2BQCaYJvZ%2FO9NAR4%3D; s_ips=1275; s_cc=true; __ssid=aadffd93-2af2-4702-a697-ec3571abb081; _ga=GA1.2.1481398525.1633109501; _gid=GA1.2.2087959709.1633109501; gpv_pn=www.linkedin.com%2Fpayments%2Fpurchase; s_pltp=www.linkedin.com%2Fpayments%2Fpurchase; s_plt=2.02; fptctx2=taBcrIH61PuCVH7eNCyH0ER3bg5M%252bbLNGu2H1yuS7CUzFWs2GI2J6yPWmVPZwJ%252bvMtPKUMsS905Iwl8zZBsxiE7mtsjqFMNNORyebNLw7Xyt1ECsqUTxuYWHzzs07f6ZWNP4QIXo4a%252bTGMnM%252feNYKCU9Ek0%252fVXaCA5yHO9VaP02h18tksy5MXHD70V1Gyzq5MwRr2oxn6jwBj82EE3UWTLy%252fBLTqf5xrHS3WR8d8cXrWX3gj5qvOoQPTy%252b7%252fXqcS9NRIFW67HOKKiEq5TPU%252bBMFKPGegUqAaCpNanr55bYPMOkXLKQhDdFabO6F7B4Sq; dfpfpt=d88a4d9619c74e1a8a91bbb653ca0471; s_sq=lnkdprod%3D%2526c.%2526a.%2526activitymap.%2526page%253Dwww.linkedin.com%25252Fpayments%25252Fpurchase%2526link%253DRevisar%252520pedido%2526region%253Dwallet%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253Dwww.linkedin.com%25252Fpayments%25252Fpurchase%2526pidt%253D1%2526oid%253DRevisar%252520pedido%2526oidt%253D3%2526ot%253DSUBMIT; s_tp=1595; s_ppv=www.linkedin.com%2Fpayments%2Fpurchase%2C105%2C80%2C1672%2C1%2C1; s_tslv=1633109815875; PLAY_LANG=es; UserMatchHistory=AQLgu4OIGl_OSQAAAXw89zJoywXzu2bNbZxcc0vumiidunMXb77VEadjzcltuC0YFPDUlk4AnfoGYaH6iMsB7wBl6OiO9NTckPCFxxHBcoxdebBF03VXGpBH2MZg-3hD8ki_pekD1SQ-moS7XfD1ADUcBKZ19JAH6HWb0dAzikqN0HpXorf9ssrexXCLZuWipPc0HAP6afTiio9hwzShWwcd-Q89pZBbLLrcLg-ABdeOmZRlvAuie2VoLyXBJfxoCThDT3Ou4IDlwh_nHTr-dLOCAm0JrEWX158pNsE; lidc='b=TB89:s=T:r=T:a=T:p=T:g=2649:u=2:x=1:i=1633110406:t=1633196208:v=2:sig=AQELJSm1V2AO--YXYTHEkxyeVrEhe0AQ'; li_rm=AQENfHtB8yo-BQAAAXw8-eleeGwbNTt6zKYjMjYBqdE2ZSESsoHTQoBG2X1AlNE9SnFtJADOYuNtVjJlnamAjlv8ihEg4mLqXf-6_wvmOpYuCjr6I9B0TCDa; lang=v=2&lang=en-us; li_at=AQEDATfk5U0AJPk2AAABfDz58ssAAAF8YQZ2y04AYaNyAvOww0nj9JqJ_iVtBjOxhnuXsvnAtmnBOGxpyIzEtMcloqDL3B_n_6rG4nMWQDW1PdW4VwARQ0qQW0tcuRCUzQfMox7DPKYsC9olZxqxLKmL; JSESSIONID='ajax:3228420206501524135'; li_a=AQJ2PTEmc2FsZXNfY2lkPTk2ODk1MjcwNyUzQSUzQTMxMTkwNzgwNwkcqpjBGmz_WqxbaWNToL6GDr0Y"
    },
    referrer: "https://www.linkedin.com/sales/search/people?doFetchHeroCard=false&logHistory=true&rsLogId=1075889658&searchSessionId=y6rrEvTCSGGBSrFoR3Nu9Q%3D%3D&tenureAtCurrentCompany=1&tenureAtCurrentPosition=1&titleIncluded=Co-Founder%3A103&titleTimeScope=CURRENT",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors"
  });

   // salesApiPeopleSearch?q=peopleSearchQuery&start=0

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
      //console.log(total + i, " Added...: ", cof_filter['elements'][i].fullName);
      success++;
    }
    catch (err) {
      console.log(total + i, " Failed..: ", cof_filter['elements'][i].fullName);
      console.log(err);
      fail++;
    }
    count = i + 1;
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

const totalProfiles = linkedInSearch(profileList,0 , 0 , 0);
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
