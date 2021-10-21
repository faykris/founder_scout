import fetch from 'node-fetch';

export default async function company_info(companyId) {  // 71261988
const result = await fetch("https://www.linkedin.com/sales-api/salesApiCompanies/" +
  companyId +
  "?decoration=%28entityUrn%2Cname%2Caccount%28saved%2CnoteCount%2ClistCount%2CcrmStatus%29%2CpictureInfo%2CcompanyPictureDisplayImage%2Cdescription%2Cindustry%2CemployeeCount%2CemployeeDisplayCount%2CemployeeCountRange%2Clocation%2Cheadquarters%2Cwebsite%2Crevenue%2CformattedRevenue%2CemployeesSearchPageUrl%2CflagshipCompanyUrl%2Cemployees*~fs_salesProfile%28entityUrn%2CfirstName%2ClastName%2CfullName%2CpictureInfo%2CprofilePictureDisplayImage%29%29", {
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
    "x-li-lang": "es_ES",
    "x-li-page-instance": "urn:li:page:d_sales2_company_index;qY2n9Es1TGWzSgVZfGTO0Q==",
    "x-restli-protocol-version": "2.0.0",
    "cookie": "li_sugr=248669f8-8a6c-4bfe-a600-5635dcdb011d; bcookie=\"v=2&61e76a31-c046-4d98-8c2c-8ee2f447df62\"; bscookie=\"v=1&20211006191210caa845ea-ad33-4bc8-8fc3-fb97e9f42056AQGf7FqLvk94GsVBhKyiNfSBpdHzOcOE\"; fcookie=AQGDRerWJbatZgAAAXyJerSofe5fdTVf2dbwSpfdfKkgBN_K-lRRo-cUMCKG47PM4aviCJC89rPSUA3cxdVmMw3VyUrICh6RHod2WENHc0hVJ6xc6ddy3ZDTzePmurOuO8Sn6zW82mtDy6H5pv6bNalNm-XOyrWxkbmUHflIlUOFJAf9J6hK3VVbwSv7y2i2G-99vsK6LyuZcnpCSug8j0eXD0LGr3A2MnseSMUpVV1YrDEco7Dl4E8ZGpU0a-mn-seLDAgxb8+78WAjtyX/5ptVxVAqArCVJY6rcQkAmPD2nwttDVZW5eqevyw1I+6Qo4OcYfQY+R3SDTGsRFXBAc/zDHlg==; li_at=AQEDATfk5U0AwT9rAAABfIl6tR0AAAF8rYc5HU0AQ-SzGCo_6E1piIH2HHTLdwP3DH2_Y9_JGTyKwyRx8zgWIrQ526uPWi8MQksBF0p99ejug3p2VNwU2u-pUBLGd7pbDELSA19HK5F9Z8gj-F-mWIHY; liap=true; JSESSIONID=\"ajax:3412942423165963119\"; timezone=America/Bogota; _guid=9eb18b37-19a5-42f0-a5ba-dadba388e031; aam_uuid=41029341209754532414172781260508165292; fid=AQGKhlKra7Ab7AAAAXyZCkIAN_oEYi0EuW3C-xv2dTrSbUl1TS1xha9FntkGed_FlGVSJ-s1n3ld6A; AnalyticsSyncHistory=AQL8SxMMkkLfcwAAAXyZClOIKqKq19EnPiRLegppn3PAqJj9nFJbtDhh8qGZnuo7jAQqE-h5o2FZjDFiIcVwdw; lms_ads=AQG5gjKTAI2NpwAAAXyZClUcv707_tkRKP3R-eJcG1gjCFfxS25iYNQkK6AmsYk_cG96fXEk-k6cY06SM_6lhSFfOyUJAA8H; lms_analytics=AQG5gjKTAI2NpwAAAXyZClUcv707_tkRKP3R-eJcG1gjCFfxS25iYNQkK6AmsYk_cG96fXEk-k6cY06SM_6lhSFfOyUJAA8H; UserMatchHistory=AQKk3OkZJrVGlgAAAXyZhIRt7QcjuaXPuuk0FnTLOgUTdo9q4jR4bYNZQByfgWPAQhKz8dWEb5eDnzgvq_0fdIqMK9z72zJ1bQYCv_4JWRgrqdUThm9wpZNqg7RvIyFTrO33EoIlm-vPrKBC27SgxzRWeM7mNP3UdM5MnW3Cf2c5YIt9HqV8zzvJpUJ89EiqV-UtLj02ACbltmD-9UAIyZ277oMBmsSl3Ty-yUsLDIMxgl-iYXiQpSsFtXCZ1Yfdbvf_KaWPIwgZh40EyATykOgZ0OdZYSFH9XUbI6A; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18920%7CMCMID%7C40531383935555829624118433342738401127%7CMCAAMLH-1635268010%7C4%7CMCAAMB-1635268010%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1634670410s%7CNONE%7CMCCIDH%7C1202759587%7CvVersion%7C5.1.1; li_a=AQJ2PTEmc2FsZXNfY2lkPTk2ODk1MjcwNyUzQSUzQTMxMTkwNzgwNwTuBj_cbTq3QpkUpmWQ_Xy_nKg2; lidc=\"b=TB89:s=T:r=T:a=T:p=T:g=2668:u=7:x=1:i=1634774068:t=1634859808:v=2:sig=AQGW1x8ZvpFgo1JgHTLcHCAI3XXklKOa\"; lang=v=2&lang=en-us"
  },
  "referrer": "https://www.linkedin.com/sales/search/people?savedSearchId=50541275&searchSessionId=E05tZMToSbahVS2vv1ZCUQ%3D%3D",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors"
});

  return await result.json();
}

//const object = await company_info("74146483").catch((err) => {return err;});;
//console.log(object);



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
/*
fetch("https://www.linkedin.com/sales-api/salesApiCompanies/74704442?decoration=%28entityUrn%2Cname%2Caccount%28saved%2CnoteCount%2ClistCount%2CcrmStatus%29%2CpictureInfo%2CcompanyPictureDisplayImage%2Cdescription%2Cindustry%2Clocation%2Cheadquarters%2Cwebsite%2CrevenueRange%2CflagshipCompanyUrl%2CemployeeGrowthPercentages%2Cemployees*~fs_salesProfile%28entityUrn%2CfirstName%2ClastName%2CfullName%2CpictureInfo%2CprofilePictureDisplayImage%29%2Cspecialties%2Ctype%2CyearFounded%29", {
  "headers": {
    "accept": "* /*",
    "accept-language": "es-ES,es;q=0.9",
    "csrf-token": "ajax:3412942423165963119",
    "sec-ch-ua": "\"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-li-identity": "dXJuOmxpOm1lbWJlcjo5Mzc3NDc3ODk",
    "x-li-lang": "es_ES",
    "x-li-page-instance": "urn:li:page:d_sales2_company_index;qY2n9Es1TGWzSgVZfGTO0Q==",
    "x-restli-protocol-version": "2.0.0",
    "cookie": "li_sugr=248669f8-8a6c-4bfe-a600-5635dcdb011d; bcookie=\"v=2&61e76a31-c046-4d98-8c2c-8ee2f447df62\"; bscookie=\"v=1&20211006191210caa845ea-ad33-4bc8-8fc3-fb97e9f42056AQGf7FqLvk94GsVBhKyiNfSBpdHzOcOE\"; fcookie=AQGDRerWJbatZgAAAXyJerSofe5fdTVf2dbwSpfdfKkgBN_K-lRRo-cUMCKG47PM4aviCJC89rPSUA3cxdVmMw3VyUrICh6RHod2WENHc0hVJ6xc6ddy3ZDTzePmurOuO8Sn6zW82mtDy6H5pv6bNalNm-XOyrWxkbmUHflIlUOFJAf9J6hK3VVbwSv7y2i2G-99vsK6LyuZcnpCSug8j0eXD0LGr3A2MnseSMUpVV1YrDEco7Dl4E8ZGpU0a-mn-seLDAgxb8+78WAjtyX/5ptVxVAqArCVJY6rcQkAmPD2nwttDVZW5eqevyw1I+6Qo4OcYfQY+R3SDTGsRFXBAc/zDHlg==; li_at=AQEDATfk5U0AwT9rAAABfIl6tR0AAAF8rYc5HU0AQ-SzGCo_6E1piIH2HHTLdwP3DH2_Y9_JGTyKwyRx8zgWIrQ526uPWi8MQksBF0p99ejug3p2VNwU2u-pUBLGd7pbDELSA19HK5F9Z8gj-F-mWIHY; liap=true; JSESSIONID=\"ajax:3412942423165963119\"; timezone=America/Bogota; _guid=9eb18b37-19a5-42f0-a5ba-dadba388e031; aam_uuid=41029341209754532414172781260508165292; fid=AQGKhlKra7Ab7AAAAXyZCkIAN_oEYi0EuW3C-xv2dTrSbUl1TS1xha9FntkGed_FlGVSJ-s1n3ld6A; AnalyticsSyncHistory=AQL8SxMMkkLfcwAAAXyZClOIKqKq19EnPiRLegppn3PAqJj9nFJbtDhh8qGZnuo7jAQqE-h5o2FZjDFiIcVwdw; lms_ads=AQG5gjKTAI2NpwAAAXyZClUcv707_tkRKP3R-eJcG1gjCFfxS25iYNQkK6AmsYk_cG96fXEk-k6cY06SM_6lhSFfOyUJAA8H; lms_analytics=AQG5gjKTAI2NpwAAAXyZClUcv707_tkRKP3R-eJcG1gjCFfxS25iYNQkK6AmsYk_cG96fXEk-k6cY06SM_6lhSFfOyUJAA8H; UserMatchHistory=AQKk3OkZJrVGlgAAAXyZhIRt7QcjuaXPuuk0FnTLOgUTdo9q4jR4bYNZQByfgWPAQhKz8dWEb5eDnzgvq_0fdIqMK9z72zJ1bQYCv_4JWRgrqdUThm9wpZNqg7RvIyFTrO33EoIlm-vPrKBC27SgxzRWeM7mNP3UdM5MnW3Cf2c5YIt9HqV8zzvJpUJ89EiqV-UtLj02ACbltmD-9UAIyZ277oMBmsSl3Ty-yUsLDIMxgl-iYXiQpSsFtXCZ1Yfdbvf_KaWPIwgZh40EyATykOgZ0OdZYSFH9XUbI6A; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18920%7CMCMID%7C40531383935555829624118433342738401127%7CMCAAMLH-1635268010%7C4%7CMCAAMB-1635268010%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1634670410s%7CNONE%7CMCCIDH%7C1202759587%7CvVersion%7C5.1.1; li_a=AQJ2PTEmc2FsZXNfY2lkPTk2ODk1MjcwNyUzQSUzQTMxMTkwNzgwNwTuBj_cbTq3QpkUpmWQ_Xy_nKg2; lidc=\"b=TB89:s=T:r=T:a=T:p=T:g=2668:u=7:x=1:i=1634774068:t=1634859808:v=2:sig=AQGW1x8ZvpFgo1JgHTLcHCAI3XXklKOa\"; lang=v=2&lang=en-us"
  },
  "referrer": "https://www.linkedin.com/sales/search/people?savedSearchId=50541275&searchSessionId=E05tZMToSbahVS2vv1ZCUQ%3D%3D",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors"
});

 */