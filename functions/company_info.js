import fetch from 'node-fetch';

export default async function company_info(companyId) {  // 71261988
const result = await fetch("https://www.linkedin.com/sales-api/salesApiCompanies/"+ companyId + "?" +
  "decoration=%28entityUrn%2Cname%2Caccount%28saved%2CnoteCount%2ClistCount%2CcrmStatus%29%2CpictureInfo%2CcompanyPictureDisplayImage%2Cdescription%2Cindustry%2Clocation%2Cheadquarters%2Cwebsite%2CrevenueRange%2CflagshipCompanyUrl%2CemployeeGrowthPercentages%2Cemployees*~fs_salesProfile%28entityUrn%2CfirstName%2ClastName%2CfullName%2CpictureInfo%2CprofilePictureDisplayImage%29%2Cspecialties%2Ctype%2CyearFounded%29", {
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
    "x-li-page-instance": "urn:li:page:d_sales2_company_index;D3lPhQeGSIWP9uvBNy/Bdw==",
    "x-restli-protocol-version": "2.0.0",
    "cookie": "li_sugr=248669f8-8a6c-4bfe-a600-5635dcdb011d; bcookie=\"v=2&61e76a31-c046-4d98-8c2c-8ee2f447df62\"; bscookie=\"v=1&20211006191210caa845ea-ad33-4bc8-8fc3-fb97e9f42056AQGf7FqLvk94GsVBhKyiNfSBpdHzOcOE\"; JSESSIONID=\"ajax:3412942423165963119\"; timezone=America/Bogota; _guid=9eb18b37-19a5-42f0-a5ba-dadba388e031; aam_uuid=41029341209754532414172781260508165292; AnalyticsSyncHistory=AQK1QzJBNoLc3gAAAXzIQxTG-NVtXKJjvXZiZowQq7FPGXJtHmoVzF5Ka7lsTRshtACp03kP3RtSynPwwk8VLA; lms_ads=AQGxiycwTLbJzgAAAXzIQxaTJdZ4zTHqgs4YuIs7Y-5jRbkjZz5VjgfkLu_b4U52FORB6Jic3sgrpKOMgg_F-OMRldm7Ao4n; lms_analytics=AQGxiycwTLbJzgAAAXzIQxaTJdZ4zTHqgs4YuIs7Y-5jRbkjZz5VjgfkLu_b4U52FORB6Jic3sgrpKOMgg_F-OMRldm7Ao4n; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18930%7CMCMID%7C40531383935555829624118433342738401127%7CMCAAMLH-1636214629%7C4%7CMCAAMB-1636214629%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1635617029s%7CNONE%7CMCCIDH%7C1202759587%7CvVersion%7C5.1.1; li_at=AQEDATfk5U0CW2KAAAABfNHxZhMAAAF89f3qE04AtYN5iGnLSzswMxDK6vqbR3dTT94kGhTKhe5A3BVEYZkZxOIvL0BTA9tZLeK3SvwP2PfCRfhgr15e3Xy_R39IAuMhygnNhOoRCs4zIVtM5aI2qvwr; liap=true; li_a=AQJ2PTEmc2FsZXNfY2lkPTk2ODk1MjcwNyUzQSUzQTMxMTkwNzgwN-YhRcB6hemnnBDZMJjj0LeM4mg6; fid=AQFooUm_5jAUkwAAAXzR8Yzdnqhjm9jbniohOn7rK3Fp7CkxthOALinCjvykLI-8PJSdcw7WN2Q5lg; lang=v=2&lang=en-us; UserMatchHistory=AQLqGHlDLAFhxAAAAXzR_vt66-_eyGJHcHYY8fx9aypvsmGKpPn11StdH5gTrRXcLM-6ifHNMi_hqLFYEEORg_-HGf7PPoWY5xQXE3atXmyx_OjS5SAMv7HiPvZwcyz1gd9u-v-GvQZ9P8kMYmIjK3tAEp0QjFl_JKKM81Sm4m4K83NriDMtrDyJGtzITCb54z7z0B9IXv1FNqrx1F4dS3CDCTyCPZgY94zYAym5VRe2qazdJOVxWcDZoxdszdYPd0Cd3DILyYnhdqkYjb1JnhK8NKmUf6O-AispEiM; lidc=\"b=TB89:s=T:r=T:a=T:p=T:g=2676:u=9:x=1:i=1635610722:t=1635696113:v=2:sig=AQFxj6ia8AOqCJUfeofqdLGYdZfFtybp\"",
    "Referer": "https://www.linkedin.com/sales/search/people/list/delta-saved-search/50540467?lastViewedAt=1635580962951&searchSessionId=Jvl%2BC4HkT66kT5OnxnGJVw%3D%3D",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
});

  return await result.json();
}
