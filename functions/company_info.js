import fetch from 'node-fetch';

export default async function company_info(companyId) {
const result = await fetch("https://www.linkedin.com/sales-api/salesApiCompanies/" + companyId + "?" +
  "decoration=%28entityUrn%2Cname%2Caccount%28saved%2CnoteCount%2ClistCount%2CcrmStatus%29%2CpictureInfo%2CcompanyPictureDisplayImage%2Cdescription%2Cindustry%2CemployeeCount%2CemployeeDisplayCount%2CemployeeCountRange%2Clocation%2Cheadquarters%2Cwebsite%2Crevenue%2CformattedRevenue%2CemployeesSearchPageUrl%2CflagshipCompanyUrl%2Cemployees*~fs_salesProfile%28entityUrn%2CfirstName%2ClastName%2CfullName%2CpictureInfo%2CprofilePictureDisplayImage%29%29", {
  "headers": {
    "accept": "*/*",
    "accept-language": "es-ES,es;q=0.9",
    "csrf-token": "ajax:5493513388572147008",
    "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-li-identity": "dXJuOmxpOm1lbWJlcjo5NDE5OTA5NTU",
    "x-li-lang": "en_US",
    "x-li-page-instance": "urn:li:page:d_sales2_company_index;BcXh7vA5QBa8ctOeeLJi2g==",
    "x-restli-protocol-version": "2.0.0",
    "cookie": "li_sugr=248669f8-8a6c-4bfe-a600-5635dcdb011d; bcookie=\"v=2&61e76a31-c046-4d98-8c2c-8ee2f447df62\"; bscookie=\"v=1&20211006191210caa845ea-ad33-4bc8-8fc3-fb97e9f42056AQGf7FqLvk94GsVBhKyiNfSBpdHzOcOE\"; timezone=America/Bogota; _guid=9eb18b37-19a5-42f0-a5ba-dadba388e031; aam_uuid=41029341209754532414172781260508165292; AnalyticsSyncHistory=AQLdFX9SWguE4AAAAXzb5nEOFaDnFjqSMwcmNnd_sx0TmRks5-6fD6t7z1goJs3QrbQSwfteXlkbuqI6KLJTZw; lms_ads=AQETFyiYFRIZqAAAAXzb5nKQFgybXZUV7QtfOnQX1qVh2oXOOilvMcVrEcl0JJBT3Y2sVZfj_YiNfUU_exfPwVSMsfxoOX65; lms_analytics=AQETFyiYFRIZqAAAAXzb5nKQFgybXZUV7QtfOnQX1qVh2oXOOilvMcVrEcl0JJBT3Y2sVZfj_YiNfUU_exfPwVSMsfxoOX65; gpv_pn=www.linkedin.com%2Fpremium%2Fproducts%2F; s_tslv=1635807775071; li_rm=AQGW2D_0wxuqCAAAAXzdyvkDhNrtA7jE6JDj-FLx791sz6TdTYr3e1WXdVJXe0Z7Pz-Km2AETH92QJC0gTbczmu-i1Q0ECzH83oz39pTceiBwE8VgujUB1C5; visit=v=1&M; fcookie=AQHFxN9vNq7ocgAAAXzdyzMhd5tCkn8BQeW_K8e5QAPmmw7S7qfaolKjV_SApnpTqwQC_1DJslVuZFcmf32DGHnH79UPkk9pK9JzHmclD9xX5B-wOFWexPb0l3GPgW55PE0EnT8J_qSnn45s-IPdkvqodkB9_QSzM36p7fT1CqCG5zXxlPyJo61BvSy_cm3QU0ofC0m7Q926KOdveuTHieM4sWunb-PbBq-qHR89CVJ-tjpHKx3AjP8LswZrsuBtmHsp/dT5uJF7nta6So1lXaSb/OG8lJXeOD6L1oPoMLGWJvC2IqZIQNK0DVYSvHILCEjCE2Tf1B4jVuIA==; g_state={\"i_p\":1635815877436,\"i_l\":1}; _gcl_au=1.1.622284.1635808713; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18933%7CMCMID%7C40531383935555829624118433342738401127%7CMCAAMLH-1636413655%7C4%7CMCAAMB-1636413655%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1635816055s%7CNONE%7CMCCIDH%7C-616281000%7CvVersion%7C5.1.1; G_ENABLED_IDPS=google; li_at=AQEDATglpCsEXfYGAAABfN44Vb0AAAF9AkTZvU4AtPuQjtooBPi9DqG5HBZRRiUFN8FCT-25eMOPZn-1GsgxVzMUSV55dfADnSgz-fY2QER4VrLr7PUIUvI5PautMii1Ev95ZADN8ZolOKi78v0yUUwm; liap=true; JSESSIONID=\"ajax:5493513388572147008\"; li_a=AQJ2PTEmc2FsZXNfY2lkPTk3NjE4MDgwNyUzQSUzQTMxNTk2MTYwN8upBtn7iKAW1ZRWDzRB5cTkUimG; fid=AQFZ3khG54rt1AAAAXzg705gC0TkTvSfbCLJaBeRHsVgRmHYN59xBPW_D8HWzbp97Cq3BzXAJoUrXA; lang=v=2&lang=en-us; UserMatchHistory=AQJIFgLtvK6rGQAAAXzg71aKlcrkN1CBa7Bv0mDVB-pN0KpICiL_cSJOC5ilx3_1RtlDYn34NiHXEF1e0blNV4l-1jS1kJ6x-bam5k6NoUWnwaflYULHsDlFNtfkXKNL03BH-0hawSRYICWOzR4s63gB7NiVHZamm-KSktSx6oaX1_LVJ7bKzMx9RGjjbmAuFX-dISa83_ZkERim-jDmPePE-ss5j4jL6NxbsBGJQ2WkUnKauBC2m4EboslFqSL486rOpt-m8KHyXqyNEimsqD2BdHK5sAPjfajkQCI; lidc=\"b=TB55:s=T:r=T:a=T:p=T:g=3035:u=6:x=1:i=1635861355:t=1635947741:v=2:sig=AQFBguNEyYQ-qM685_vbZMx7tiqQh3qV\"",
    "Referer": "https://www.linkedin.com/sales/search/people?companySize=B&logHistory=true&savedSearchId=50501059&searchSessionId=rOTthlpWSLWKx25ke%2F%2B8nQ%3D%3D&tenureAtCurrentCompany=1&tenureAtCurrentPosition=1&titleIncluded=Co-Founder%3A103&titleTimeScope=CURRENT",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
});

  return await result.json();
}
