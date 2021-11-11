import fetch from 'node-fetch';

export default async function people_search(count) {
  const result = await fetch("https://www.linkedin.com/sales-api/salesApiPeopleSearch?" +
    "q=savedSearch&" +
    "savedSearchId=50500827&" +
    "newResultsOnly=true&" +
    "start=" + String(count) + "&" +
    "count=100&" +
    "lastViewedAt=1636381255252", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9,es-ES;q=0.8,es;q=0.7",
      "csrf-token": "ajax:7144628061855638597",
      "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-li-identity": "dXJuOmxpOm1lbWJlcjo5NDE5OTA5NTU",
      "x-li-lang": "en_US",
      "x-li-page-instance": "urn:li:page:d_sales2_search_people_pivot_saved_delta;l4zATOTISUi0jBZz11+ZHg==",
      "x-restli-protocol-version": "2.0.0",
      "cookie": "li_sugr=248669f8-8a6c-4bfe-a600-5635dcdb011d; bcookie=\"v=2&61e76a31-c046-4d98-8c2c-8ee2f447df62\"; bscookie=\"v=1&20211006191210caa845ea-ad33-4bc8-8fc3-fb97e9f42056AQGf7FqLvk94GsVBhKyiNfSBpdHzOcOE\"; timezone=America/Bogota; _guid=9eb18b37-19a5-42f0-a5ba-dadba388e031; aam_uuid=41029341209754532414172781260508165292; gpv_pn=www.linkedin.com%2Fpremium%2Fproducts%2F; s_tslv=1635807775071; li_rm=AQGW2D_0wxuqCAAAAXzdyvkDhNrtA7jE6JDj-FLx791sz6TdTYr3e1WXdVJXe0Z7Pz-Km2AETH92QJC0gTbczmu-i1Q0ECzH83oz39pTceiBwE8VgujUB1C5; visit=v=1&M; g_state={\"i_p\":1635815877436,\"i_l\":1}; _gcl_au=1.1.622284.1635808713; G_ENABLED_IDPS=google; fid=AQFZ3khG54rt1AAAAXzg705gC0TkTvSfbCLJaBeRHsVgRmHYN59xBPW_D8HWzbp97Cq3BzXAJoUrXA; AnalyticsSyncHistory=AQJ39ekpgDcFXAAAAXzxFYxIaLDGCFUumzo0x2vZtRf219vAFecD0k9Y5obOmBe8UqK59F_wg3HG2n016FWTsg; lms_ads=AQE8ObItJixDTwAAAXzxFY1PognrMsfFv718cIiCok3x0jpce36JB8O5aFyKS-PDeuB43Lt4-snNcCI7JzDP6fzz7L01o7_A; lms_analytics=AQE8ObItJixDTwAAAXzxFY1PognrMsfFv718cIiCok3x0jpce36JB8O5aFyKS-PDeuB43Lt4-snNcCI7JzDP6fzz7L01o7_A; UserMatchHistory=AQIkzOU1jYuBMwAAAXz4sYLP-pknKC9KGpWbyCdKYu0JnTIojmQ_yCxulXSIKRA2qDq_ZLwa9LHR-oCoSP3LcWgcVdR-uNmpHX8Gk6SMSt2OB6WgZYbt6HdLEwfJqFZK4lQzyX8Sp8oNWuuTLuweO8rkxzmpiGi6xT6NaRlbVMnPnLNuImf6YjR7-OyhTsFKa3_R3F7eDnyyrfH7bLNcFUC3oPt1egDIGwrqxT-0R8eUMeRELR7ncvsXpbWj7RlhbaWsyXahCA3wEwYZnKN8UpSbakGGbbsnohYEjv0; li_at=AQEDATglpCsCLXKUAAABfPt0DoAAAAF9H4CSgE4AKWNyMR7ucxJgEQc0VWOXBzIBdNzSeLak0ED7Crm-e_D1D3NB5R5Y4YQKe3fuTk084GVla32aRI2oewq1ScdfA03wYbclJ36A6TRtyWhMK-2uSWHg; liap=true; JSESSIONID=\"ajax:7144628061855638597\"; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18939%7CMCMID%7C40531383935555829624118433342738401127%7CMCAAMLH-1636911058%7C4%7CMCAAMB-1636911058%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1636313458s%7CNONE%7CMCCIDH%7C-616281000%7CvVersion%7C5.1.1; lang=v=2&lang=en-us; lidc=\"b=TB55:s=T:r=T:a=T:p=T:g=3043:u=8:x=1:i=1636415208:t=1636501608:v=2:sig=AQEw5R_ZdIvkjH8yUDSY5hwhNp1UGryN\"; li_a=AQJ2PTEmc2FsZXNfY2lkPTk3NjE4MDgwNyUzQSUzQTMxNTk2MTYwNyY2T2wGndbqia4LtqpzDjRc_zYN",
      "Referer": "https://www.linkedin.com/sales/search/saved-searches/people",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });

  return await result.json();
}
