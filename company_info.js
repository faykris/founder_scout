import fetch from 'node-fetch';

async function company_info(companyId) {  // 71261988
const result = await fetch("https://www.linkedin.com/sales-api/salesApiCompanies/" +
  companyId +
  "?decoration=%28entityUrn%2Cname%2Caccount%28saved%2CnoteCount%2ClistCount%2CcrmStatus%29%2CpictureInfo%2CcompanyPictureDisplayImage%2Cdescription%2Cindustry%2CemployeeCount%2CemployeeDisplayCount%2CemployeeCountRange%2Clocation%2Cheadquarters%2Cwebsite%2Crevenue%2CformattedRevenue%2CemployeesSearchPageUrl%2CflagshipCompanyUrl%2Cemployees*~fs_salesProfile%28entityUrn%2CfirstName%2ClastName%2CfullName%2CpictureInfo%2CprofilePictureDisplayImage%29%29", {
  "headers": {
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
    "x-li-page-instance": "urn:li:page:d_sales2_search_people_saved_all;U3z6yR4CRTmO8sST4NX/UQ==",
    "x-restli-protocol-version": "2.0.0",
    "cookie": "li_sugr=f158f3ac-77e6-447e-b2af-9545fc5d9e06; bcookie='v=2&c9eb21a4-fc2f-4f29-8659-b41b16dd4ecf'; bscookie='v=1&20211001172434d70910a8-e1cc-49e9-8aa0-0ecff8027596AQFEM3tpoixToYXNm3jTfcXXrkcKWORt'; aam_uuid=40577756698522595741660832106329087972; g_state={'i_p':1633116282895,'i_l':1}; _gcl_au=1.1.685508982.1633109242; timezone=America/Bogota; _guid=0fcb2493-f4c3-46d2-9ca0-1ca73e9ccc95; __ssid=aadffd93-2af2-4702-a697-ec3571abb081; _ga=GA1.2.1481398525.1633109501; gpv_pn=www.linkedin.com%2Fpayments%2Fpurchase; dfpfpt=d88a4d9619c74e1a8a91bbb653ca0471; s_tslv=1633109815875; li_rm=AQENfHtB8yo-BQAAAXw8-eleeGwbNTt6zKYjMjYBqdE2ZSESsoHTQoBG2X1AlNE9SnFtJADOYuNtVjJlnamAjlv8ihEg4mLqXf-6_wvmOpYuCjr6I9B0TCDa; JSESSIONID='ajax:3228420206501524135'; G_ENABLED_IDPS=google; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18914%7CMCMID%7C40800350625631250531712310401552477231%7CMCAAMLH-1634749753%7C4%7CMCAAMB-1634749753%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1634152153s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C1202759587; li_at=AQEDATfk5U0F0G8KAAABfHqhLYAAAAF8nq2xgE4AWGgnwwvICV85OcoYoHO05zsPC7_xnhqQb6n9T0zAmEPKp1X_hsMXCGG5_NWpnPy1Q_5LW0fLH7Ey0khHqx9Uj3WdonC0wFWeoxRsWplBCfD-hwou; liap=true; lang=v=2&lang=en-us; spectroscopyId=ca1a9ec3-25f8-43d0-873c-2f005acffe45; UserMatchHistory=AQLqPVTztmZ6MQAAAXx6oVO3l7hdpNHDEeUhBEM3FrDbQENteeruCbaf5oGNBB5LZQ5ZF9AKAUKVQ3MpzgFvSgz1I78zDrz7qEQZEJWpL_bSeqDvAkti6bI458Z2pVEiXvB-Dte1UfChdZ3B-RjKtNO4BoCz9kq4TCF3Dc-895Sx0sohWbWqSFhCijxSSkrohZRrdTU4Ywl6vygjW5Y0CrES3H1wGrvPLyyqM3jnrzlgiZTD8OhGN-0JqeYbWGN4dfYGsOhFAZHemGw04wBoAxdw4LGGv-udCfxZ7ws; AnalyticsSyncHistory=AQIWmjq1wTdImwAAAXx6oVO3FwNZmgyu7cZPOARgwIAu-KHJEUNOnbOsiRRH0TBqUNsvQzg0Lsua4kTiuQI8FQ; lms_ads=AQGx-otjPXkkdQAAAXx6oVT5qLfiSlzkhVCQZGCJf8zVU9mOyoifU8s1Ak8vXGzyO4FZW6rwVwYT-aob6QNhStM0aYW8a4dj; lms_analytics=AQGx-otjPXkkdQAAAXx6oVT5qLfiSlzkhVCQZGCJf8zVU9mOyoifU8s1Ak8vXGzyO4FZW6rwVwYT-aob6QNhStM0aYW8a4dj; lidc='b=TB89:s=T:r=T:a=T:p=T:g=2661:u=5:x=1:i=1634144966:t=1634183032:v=2:sig=AQEfpN_Zh2-ETOq82oLdRWZeuzrGIDwQ'; li_a=AQJ2PTEmc2FsZXNfY2lkPTk2ODk1MjcwNyUzQSUzQTMxMTkwNzgwN6k-qC_VOfGfK4SZ1oQP_PsZwajs"
  },
  "referrer": "https://www.linkedin.com/sales/search/people?savedSearchId=50540467&searchSessionId=dMkQVeUhTueKj3uPGWJBWA%3D%3D",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors"
});

  return await result.json();
}

const object = await company_info("74146483");
console.log(object);
 //export default company_info;



/*
fetch(
  "https://www.linkedin.com/sales-api/salesApiCompanies/" + companyId + "?" +
  "decoration=%28entityUrn%2Cname%2Caccount%28saved%2CnoteCount%2ClistCount%2CcrmStatus%29%2CpictureInfo%2CcompanyPictureDisplayImage%2Cdescription%2Cindustry%2CemployeeCount%2CemployeeDisplayCount%2CemployeeCountRange%2Clocation%2Cheadquarters%2Cwebsite%2Crevenue%2CformattedRevenue%2CemployeesSearchPageUrl%2CflagshipCompanyUrl%2Cemployees*~fs_salesProfile%28entityUrn%2CfirstName%2ClastName%2CfullName%2CpictureInfo%2CprofilePictureDisplayImage%29%29", {
  headers: {
    "accept": "* /*",
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
  "x-li-page-instance": "urn:li:page:d_sales2_search_people;O7qNPqJYRv2xfUgcX2oCWw==",
  "x-restli-protocol-version": "2.0.0",
  "cookie": "li_sugr=f158f3ac-77e6-447e-b2af-9545fc5d9e06; bcookie='v=2&c9eb21a4-fc2f-4f29-8659-b41b16dd4ecf'; bscookie='v=1&20211001172434d70910a8-e1cc-49e9-8aa0-0ecff8027596AQFEM3tpoixToYXNm3jTfcXXrkcKWORt'; aam_uuid=40577756698522595741660832106329087972; g_state={'i_p':1633116282895,'i_l':1}; _gcl_au=1.1.685508982.1633109242; liap=true; timezone=America/Bogota; _guid=0fcb2493-f4c3-46d2-9ca0-1ca73e9ccc95; AnalyticsSyncHistory=AQIeeBcEIVk-DwAAAXw85hYVWH9qoqxPFbav4fo8SoNI9MMrXmS34cvri7FQz05NMYJARbZPuJdo16Gpe7FAZQ; lms_ads=AQFRDemKv476qAAAAXw85hbnHT-17iA7IjVx4__SEqu7Zp5VuUTrzNuoMI4DcrMybA3MU7ko_f0rRpkUB9sIcMD6B7WnDvVh; lms_analytics=AQFRDemKv476qAAAAXw85hbnHT-17iA7IjVx4__SEqu7Zp5VuUTrzNuoMI4DcrMybA3MU7ko_f0rRpkUB9sIcMD6B7WnDvVh; __ssid=aadffd93-2af2-4702-a697-ec3571abb081; _ga=GA1.2.1481398525.1633109501; gpv_pn=www.linkedin.com%2Fpayments%2Fpurchase; dfpfpt=d88a4d9619c74e1a8a91bbb653ca0471; s_tslv=1633109815875; li_rm=AQENfHtB8yo-BQAAAXw8-eleeGwbNTt6zKYjMjYBqdE2ZSESsoHTQoBG2X1AlNE9SnFtJADOYuNtVjJlnamAjlv8ihEg4mLqXf-6_wvmOpYuCjr6I9B0TCDa; li_at=AQEDATfk5U0AJPk2AAABfDz58ssAAAF8YQZ2y04AYaNyAvOww0nj9JqJ_iVtBjOxhnuXsvnAtmnBOGxpyIzEtMcloqDL3B_n_6rG4nMWQDW1PdW4VwARQ0qQW0tcuRCUzQfMox7DPKYsC9olZxqxLKmL; JSESSIONID='ajax:3228420206501524135'; li_a=AQJ2PTEmc2FsZXNfY2lkPTk2ODk1MjcwNyUzQSUzQTMxMTkwNzgwNwkcqpjBGmz_WqxbaWNToL6GDr0Y; lang=v=2&lang=en-us; spectroscopyId=f6270258-8823-4d1c-8d85-8dd0dfc04e36; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18904%7CMCMID%7C40800350625631250531712310401552477231%7CMCAAMLH-1633961756%7C4%7CMCAAMB-1633961756%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1633364156s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C1202759587; UserMatchHistory=AQJQrE3AXqPtiAAAAXxMNixRJBoAWN-aIjWlBqgYXqwmQG3Vo_Jy4lOPwXh1xmuzI6sVpkKbgrCjKtvrANwdK0WLx_6uXvkZo-sztjxgvW67cRhVGPmIVSyZ2gxBnu4K_gI2X-Wp3kj19cbRIJrl-K9ehLcSdqUrtYy3w_BqTQFS4N71qNXoxPLIgSD9MzaB_ERlAhdLrG6VWeCajrhipQsic2puDOvsls31G7W-HZFLS0cxPbHAwqOQYBoikdrb0DgkmA_lUztgubxesfTv9aZjKv01y7R3iGi4LUw; lidc='b=TB89:s=T:r=T:a=T:p=T:g=2650:u=2:x=1:i=1633366193:t=1633437841:v=2:sig=AQGKqWKMtUdnfAQSfKv6ew7ma8dFgloQ'"
},
referrer: "https://www.linkedin.com/sales/search/people?doFetchHeroCard=false&logHistory=true&rsLogId=1075889658&searchSessionId=y6rrEvTCSGGBSrFoR3Nu9Q%3D%3D&tenureAtCurrentCompany=1&tenureAtCurrentPosition=1&titleIncluded=Co-Founder%3A103&titleTimeScope=CURRENT",
  referrerPolicy: "strict-origin-when-cross-origin",
  body: null,
  method: "GET",
  mode: "cors"
});
 */