import fetch from 'node-fetch';

let profileList = []

async function linkedInSearch() {
  const result = await fetch('https://www.linkedin.com/voyager/api/search/dash/clusters?decorationId=com.linkedin.voyager.dash.deco.search.SearchClusterCollection-120&origin=GLOBAL_SEARCH_HEADER&q=all&query=(keywords:Co-founder,flagshipSearchIntent:SEARCH_SRP,queryParameters:(geoUrn:List(100876405),resultType:List(PEOPLE),title:List(Co-founder)),includeFiltersInResponse:false)&start=40', {
    headers: {
      'authority': 'www.linkedin.com',
      'sec-ch-ua': 'Google',
      'x-restli-protocol-version': '2.0.0',
      'x-li-lang': 'en_ES',
      'sec-ch-ua-mobile': '?0',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
      'x-li-page-instance': 'urn:li:page:d_flagship3_search_srp_people;qfzgBLK1RMiwf8gWTF21Lg==',
      'accept': 'application/vnd.linkedin.normalized+json+2.1',
      'csrf-token': 'ajax:-2484084762163042114',
      'x-li-track': '{"clientVersion":"1.9.3586","mpVersion":"1.9.3586","osName":"web","timezoneOffset":-5,"timezone":"America/Bogota","deviceFormFactor":"DESKTOP","mpName":"voyager-web","displayDensity":1,"displayWidth":3440,"displayHeight":1440}',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://www.linkedin.com/search/results/people/?keywords=Co-founder&origin=GLOBAL_SEARCH_HEADER&sid=Z)4&title=Co-founder',
      'accept-language': 'es-CO,es;q=0.9,en-US;q=0.8,en;q=0.7,es-419;q=0.6',
      'cookie': 'bcookie="v=2&d24ef2e6-43bc-429c-8bee-3ff9fe8bdd94"; bscookie="v=1&202008261948557084ab11-5a95-4760-8d2d-0e348039afa9AQFvuGpXrVjKAeq0fPzbqXijZgejXcCa"; _ga=GA1.2.1034361473.1598471344; JSESSIONID="ajax:-2484084762163042114"; li_sugr=f54e704d-310b-469c-9212-c4b3374084e9; li_at=AQEDATRHghQFVAJiAAABfBNYInUAAAF8N2SmdU4AF2MfjetKW1KOJuTSzkbGqabxX-ntiyvsM-N4Q6bmUOCqYa_z7ZU4zwWek6Oof_cF00mFXxIP35DoUYy2gTTCXLPNxfnSlL6UfMdd5w7aq9-Dt43o; liap=true; timezone=America/Bogota; _guid=6559edde-3089-448d-af57-0ca61065aeeb; aam_uuid=53858827821654513194469722585622243596; s_fid=55B6F1647F1D3088-04CB09094271D240; mbox=PC^#eb56ba265df24d18aa5d0790ea00a7d3.34_0^#1647991800^|session^#0169b576ce034345b59c03d890b5d069^#1632441271; gpv_pn=www.linkedin.com^%^2Flearning^%^2Fsubscription^%^2Fproducts; s_tslv=1632600172651; AnalyticsSyncHistory=AQLYK0hyDpjC9AAAAXwi7posCL2z5slLDygsbK8VyVdji4aB5OSmDny9ZMBVE7gW68oMV5DrfANd1dWQmYwOWw; lms_ads=AQEq_3V5-vvXegAAAXwi7p1C6FYwaYSobqv8lOlvf3A8x3uXdOBZ7PZOrE6PAy7FxsOiIMWcLuIvoIUPIup-vQzOHpjjQ1hG; lms_analytics=AQEq_3V5-vvXegAAAXwi7p1C6FYwaYSobqv8lOlvf3A8x3uXdOBZ7PZOrE6PAy7FxsOiIMWcLuIvoIUPIup-vQzOHpjjQ1hG; lang=v=2&lang=es-es; spectroscopyId=19880883-e89a-4109-8f4a-eacd8ef7709f; AMCVS_14215E3D5995C57C0A495C55^%^40AdobeOrg=1; AMCV_14215E3D5995C57C0A495C55^%^40AdobeOrg=-637568504^%^7CMCIDTS^%^7C18896^%^7CMCMID^%^7C53641575817627366364524017825332796103^%^7CMCAAMLH-1633282823^%^7C4^%^7CMCAAMB-1633282823^%^7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y^%^7CMCOPTOUT-1632685223s^%^7CNONE^%^7CvVersion^%^7C5.1.1^%^7CMCCIDH^%^7C628514282; UserMatchHistory=AQJjf_ZApB_SkQAAAXwjOhsg9d9mtIRmH9Y8ZbuASIN3ubK0v20B0w5NHzsY24fyTe8gIqD_6zNo__4lB7IlKn6iPgbuQNgIHowTKZ6GYuFRlkG5WBD3o62iRLG00ZRTo99R-V8LZERvCl69BcXEcQwe-JSFdsVEggj5jzea0Fpe-fCd3hXkMMcR0dkygn4R0mxe6sTnMN5spymyLGIo54yAYvN2erNmbvLBHUpeBSviy3ghMPWGVLJcTOnR0NiNS8tY5Ymlbvc0oMFcQZNFi_iRX604r11IZB0FBuA; lidc="b=VB88:s=V:r=V:a=V:p=V:g=2777:u=77:x=1:i=1632678586:t=1632709591:v=2:sig=AQF6gj9eBs0GBcSVRQeW3jnLyH0k-prz"'
    }
  });
  const object = await result.json();


  for (let i = 0; i < object['included'].length ;i++) {
    if (object['included'][i].navigationUrl !== undefined) {
      let profileDict = {};
      const profileParms = object['included'][i].navigationUrl.split('/');
      const profileName = profileParms[4].split('?');
      const profile_inf = await linkedInProfile(profileName[0]);

      profileDict["fullName"] = object['included'][i].title.text;
      profileDict["navigationUrl"] = object['included'][i].navigationUrl;
      profileDict["url"] = object['included'][i].navigationUrl.split('?')[0];
      if (profile_inf !== undefined) {
        profileDict["month"] = profile_inf[0];
        profileDict["year"] = profile_inf[1];
        profileDict["companyName"] = profile_inf[2];
        profileDict["title"] = profile_inf[3];
      }
      profileList.push(profileDict);
    }
  }
  return profileList;
}

async function linkedInProfile(profileName) {
  if (profileName === undefined) return undefined;
  const result = await fetch('https://www.linkedin.com/voyager/api/identity/dash/profiles?q=memberIdentity&memberIdentity=' +
                                 profileName +
                                 '&decorationId=com.linkedin.voyager.dash.deco.identity.profile.FullProfileWithEntities-85', {
    headers: {
      'authority': 'www.linkedin.com',
      'sec-ch-ua': '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
      'x-restli-protocol-version': '2.0.0',
      'x-li-lang': 'es_ES',
      'sec-ch-ua-mobile': '?0',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
      'x-li-page-instance': 'urn:li:page:d_flagship3_profile_view_base;vA0h+xIZQRWhjZxmjYUDSQ==',
      'accept': 'application/vnd.linkedin.normalized+json+2.1',
      'x-li-deco-include-micro-schema': 'true',
      'csrf-token': 'ajax:-2484084762163042114',
      'x-li-track': '{"clientVersion":"1.9.3586","mpVersion":"1.9.3586","osName":"web","timezoneOffset":-5,"timezone":"America/Bogota","deviceFormFactor":"DESKTOP","mpName":"voyager-web","displayDensity":1,"displayWidth":3440,"displayHeight":1440}',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://www.linkedin.com/in/alejandro-mora-26aa3840/?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAiyInIBx_Dn0834X1oJ63x5Le2PnUmkqOo',
      'accept-language': 'es-CO,es;q=0.9,en-US;q=0.8,en;q=0.7,es-419;q=0.6',
      'cookie': 'bcookie="v=2&d24ef2e6-43bc-429c-8bee-3ff9fe8bdd94"; bscookie="v=1&202008261948557084ab11-5a95-4760-8d2d-0e348039afa9AQFvuGpXrVjKAeq0fPzbqXijZgejXcCa"; _ga=GA1.2.1034361473.1598471344; JSESSIONID="ajax:-2484084762163042114"; li_sugr=f54e704d-310b-469c-9212-c4b3374084e9; li_at=AQEDATRHghQFVAJiAAABfBNYInUAAAF8N2SmdU4AF2MfjetKW1KOJuTSzkbGqabxX-ntiyvsM-N4Q6bmUOCqYa_z7ZU4zwWek6Oof_cF00mFXxIP35DoUYy2gTTCXLPNxfnSlL6UfMdd5w7aq9-Dt43o; liap=true; timezone=America/Bogota; _guid=6559edde-3089-448d-af57-0ca61065aeeb; aam_uuid=53858827821654513194469722585622243596; s_fid=55B6F1647F1D3088-04CB09094271D240; mbox=PC#eb56ba265df24d18aa5d0790ea00a7d3.34_0#1647991800|session#0169b576ce034345b59c03d890b5d069#1632441271; gpv_pn=www.linkedin.com%2Flearning%2Fsubscription%2Fproducts; s_tslv=1632600172651; AnalyticsSyncHistory=AQLYK0hyDpjC9AAAAXwi7posCL2z5slLDygsbK8VyVdji4aB5OSmDny9ZMBVE7gW68oMV5DrfANd1dWQmYwOWw; lms_ads=AQEq_3V5-vvXegAAAXwi7p1C6FYwaYSobqv8lOlvf3A8x3uXdOBZ7PZOrE6PAy7FxsOiIMWcLuIvoIUPIup-vQzOHpjjQ1hG; lms_analytics=AQEq_3V5-vvXegAAAXwi7p1C6FYwaYSobqv8lOlvf3A8x3uXdOBZ7PZOrE6PAy7FxsOiIMWcLuIvoIUPIup-vQzOHpjjQ1hG; lang=v=2&lang=es-es; spectroscopyId=19880883-e89a-4109-8f4a-eacd8ef7709f; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18896%7CMCMID%7C53641575817627366364524017825332796103%7CMCAAMLH-1633297036%7C4%7CMCAAMB-1633297036%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1632699436s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C628514282; UserMatchHistory=AQIuy9Bqku60hwAAAXwkZh9c28oI9zKb8LFAx17qoVClB0PYTeORJQRQbcoOb3TBAi3XKPQBmNzK5m7vlRWUGGmX2tFgLYc17WJLe1f44q91RrWS38qeDe-3QG2WCAs278RzDOQsBVlowX6qaTH7NINlNhFwl4bi6UZ0I61Cqad2C_9GrPx6DVmD1bK58nRHgDKqp-vFWRh3GWUG8r5clr2S36ofiPyUK883Nk0lOv1KOQIabdn6dGNRP7bLJzMwe3stEpgjBqzBd-ngCIM-IyG8OVXkPEUIHk9OuSU; lidc="b=VB88:s=V:r=V:a=V:p=V:g=2777:u=77:x=1:i=1632698250:t=1632709591:v=2:sig=AQFVOvkreyQzwzj4qwP_tQFpeyAR0GVw"'
    }
  });

  const object = await result.json();
  let title = '';
  let profile_info = [];
  let month = undefined;
  let year = undefined;
  let companyName = undefined;

  for (let i = 0; i < object['included'].length; i++) {
    title = String(object['included'][i].title);
    if ((title.includes('Co-Founder') || title.includes('Co Founder') ||
         title.includes('Co-founder') || title.includes('Co Founder') ||
         title.includes('co-founder') || title.includes('co Founder') ||
         title.includes('CO-FOUNDER') || title.includes('CO FOUNDER')) &&
        object['included'][i].dateRange !== undefined) {

      try {
        month = object['included'][i].dateRange.start.month;
        year = object['included'][i].dateRange.start.year;
        companyName = object['included'][i].companyName;
      }
      catch (ex) {
        console.log(ex);
        break
      }
      profile_info.push(month, year, companyName, title);

      return profile_info;
    }
  }

}

console.log(await linkedInSearch());

