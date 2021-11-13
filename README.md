![# Founder Scout](images/fs2.png)
Founder Scout is a LinkedIn scraper that retrieves information about co-founders into web search filter.
This project is based in scrape requests using Nodejs with fetch functions, the information
will arrive to Mongodb Atlas and Airtable base at the same time. Then it can be consulted in both parts, in the case
of Mongodb Atlas, the profiles will be saved in the form of documents within the co-founders' collection, in the case
of the Airtable base they will be saved as records in a table.

## Features	📌
* Save scraped information into a database in MongoDB Atlas and an Airtable spreadsheet to will be managed.
* For developers, they can use an REST API that queries the data by vimd, country or city.
* Send email notification with the newest co-founders profiles to the interested people.

## Beginning 🚀
To implement this, we are needs only make a pull to a project's GitHub repository, also create a .env files and fill them
with their environment variables and import the Node modules.

### Requirements 📋
* Install Nodejs version 14 or higher
* Have a premium LinkedIn account with Sales Navigator tool
* Have a Mongodb Atlas user to access co-founders collection
* Have the Airtable base access key to use the API
* An available server to run automate process using PM2

### Installation ⚙
The first step we need to clone our [Founder Scout](https://github.com/faykris/founder_scout.git) repository.
```bash
~$ git clone https://github.com/faykris/founder_scout.git
```
We need install Nodejs, for a correct version (for example v14.17.6) we use the following commands:
```bash
~$ curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
~$ sudo apt-get install -y nodejs
```
Create .env files into project folder (founder_scout),also in crud and airtable folder, then fill these with their environment
variables (use your preferred code editor, this is an example):

```bash
/founder_scout~$ vim .env 
```

```bash
MONGODB_URI=mongodb+srv://user:password@cluster0.bxsvo.mongodb.net/founder_scout?retryWrites=true&w=majority
APY_KEY=aaaaaaaaaaaaaaaaa
BASE_ID=bbbbbbbbbbbbbbbbb
EMAIL_USER=user@founderscout.com
EMAIL_PASS=ccccccccccccccc
EMAIL_DEST=email1@founderscout.com, email2@founderscout.com
EMAIL_SUPP=support@founderscout.com
```

* MONGODB_URI: a corresponding uri connect to Mongodb Atlas
* API_KEY: API key that's used to manage de Airtable data
* BASE_ID: Identifier of the Airtable Base that we are needs to manage
* EMAIL_USER: email that will be used with Nodemailer
* EMAIL_PASS: password created from email security settings (for the Nodemailer usage)
* EMAIL_DEST: list of receivers of email with the newest profiles
* EMAIL_SUPP: email that supporter person about this project execution

Now, we need to install node packages defined in package.json file, using the following command:
```bash
/founder_scout~$ npm i
```
Finally, install [tmux](https://www.hamvocke.com/blog/a-quick-and-easy-guide-to-tmux/) for create background processes:
```bash
/founder_scout~$ sudo apt-get install tmux
```

## Extract Nodejs fetches 🗃
At this point we need to log in to the LinkedIn premium account and enter the Sales Navigator page.
Then save a search with the filters: title as co-founders, years in current position as less than 1 year,
Years at current company as less than 1 year and company headcount between 1 and 10 employees.
![filter image](images/sn_filter.jpg)
We save the previous filter by clicking the Save Search button and go to the Saved Searches button on the
right side of the search bar, each time there are new profiles the amount in the New results column, the
total corresponding to the profiles will be displayed existing according to the filter will be shown with
the name of the search in the Name column. Note that it is preferable that you have previously opened to Inspect menu of your browser.
![saved search image](images/sn_ss0.jpg)
Now we see the result of profiles according to our search, note that Sales Navigator can only show
the first 2500 profiles in a search filter, each page shows 25 records, resulting in that the limit is page
100 of results, After this, it returns an error of status 400. But at least we can change the value of how
many profiles it brings per request from 25 to 100, no more than that, so that only 25 requests have to be
made to scrape the limit amount.
![people search image](images/sn_ss1.jpg)
We enter the process of extracting the functions we need to scrape, now we access the Network tab of
to Inspect panel, then we write "people" or "salesApiPeopleSearch?" to find the request we need to use.
We select Fetch / XHR to bring only requests with Fetch, finally we select with right-click the option
"Copy as Nodejs Fetch".
![people search fetch image](images/sn_ss2.jpg)
For companies the process is the same, now we select a company from any profile loaded in the filter,
before that copy "company" as the filter where you put "people". By clicking on the link of a company,
its profile will appear and the request we need will be loaded, to know that we are taking the correct
one, we verify that the response JSON contains "description" as the first key. Finally, We copy in the same way
as Nodejs fetch.
![company fetch image](images/sn_ss3.jpg)

The previous steps to extract the fetch function in the search for people and companies are to update each
time max-redirections occurs, which is frequent and requires doing it manually. Every time this happens,
an email is sent to the recipient, who must be the one who does the support. this is inside the 
functions/max_redirections_email.js file.

* ### people_search fetch
```node
fetch("https://www.linkedin.com/sales-api/salesApiPeopleSearch?q=savedSearch&savedSearchId=50500827&newResultsOnly=false&start=0&count=25", {
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
      "x-li-page-instance": "urn:li:page:d_sales2_search_people_saved_all;JbLJEa0zRciwbwF/YNFzzA==",
      "x-restli-protocol-version": "2.0.0",
      "cookie": "li_sugr=248669f8-8a6c-4bfe-a600-5635dcdb011d; bcookie=\"v=2&61e76a31-c046-4d98-8c2c-8ee2f447df62\"; bscookie=\"v=1&20211006191210caa845ea-ad33-4bc8-8fc3-fb97e9f42056AQGf7FqLvk94GsVBhKyiNfSBpdHzOcOE\"; timezone=America/Bogota; _guid=9eb18b37-19a5-42f0-a5ba-dadba388e031; aam_uuid=41029341209754532414172781260508165292; gpv_pn=www.linkedin.com%2Fpremium%2Fproducts%2F; s_tslv=1635807775071; li_rm=AQGW2D_0wxuqCAAAAXzdyvkDhNrtA7jE6JDj-FLx791sz6TdTYr3e1WXdVJXe0Z7Pz-Km2AETH92QJC0gTbczmu-i1Q0ECzH83oz39pTceiBwE8VgujUB1C5; visit=v=1&M; g_state={\"i_p\":1635815877436,\"i_l\":1}; _gcl_au=1.1.622284.1635808713; G_ENABLED_IDPS=google; li_at=AQEDATglpCsCLXKUAAABfPt0DoAAAAF9H4CSgE4AKWNyMR7ucxJgEQc0VWOXBzIBdNzSeLak0ED7Crm-e_D1D3NB5R5Y4YQKe3fuTk084GVla32aRI2oewq1ScdfA03wYbclJ36A6TRtyWhMK-2uSWHg; liap=true; JSESSIONID=\"ajax:7144628061855638597\"; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18939%7CMCMID%7C40531383935555829624118433342738401127%7CMCAAMLH-1636911058%7C4%7CMCAAMB-1636911058%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1636313458s%7CNONE%7CMCCIDH%7C-616281000%7CvVersion%7C5.1.1; UserMatchHistory=AQI9t70dntU_SQAAAX0IAnDnjFy8af1UJqT-DAYLDxrbUlHipt12wdEYMsZGxvVFZDMdH2878R7_WdVt0MsYTfI-iF4gmvy7qBSLOUHg7kATdlL2xp7X48W86Qqm19MQf01RmVNfSbRZwbLs9qhIjnSnmIBBCsRgZs40UUwQBS4vsDrI8s79UbDUduHFp3LuqzMm8m3Ri43sWPpO2emqQge5NCRtn_NSod2-KTPZTC85RVoFI_4fQ5rmQCWb9kfXXgQ1sk3akWGR1xlN8mhi9LmwHW1RLItN5IAEAAw; AnalyticsSyncHistory=AQIwXZxhdhLTpwAAAX0IAnDnOol6rO_d9feZBRAUoAOext1WHtAePccRxO1vr1EXA9UWgwxJT49m1SLoxQ3bvQ; lms_ads=AQEoE7YL_ArQwwAAAX0IAnGXAQ7_3Aj0n6dY9DFFV_WU7SPVDUMfGWnPHRO7-dFXeYV2p4bi7dp5f0LB3zOuXmYqfvBHowZJ; lms_analytics=AQEoE7YL_ArQwwAAAX0IAnGXAQ7_3Aj0n6dY9DFFV_WU7SPVDUMfGWnPHRO7-dFXeYV2p4bi7dp5f0LB3zOuXmYqfvBHowZJ; lang=v=2&lang=en-us; lidc=\"b=TB55:s=T:r=T:a=T:p=T:g=3046:u=12:x=1:i=1636751339:t=1636825375:v=2:sig=AQEuHNXRbcJuy_Ha8i8qUPFlYoau6-aE\"; li_a=AQJ2PTEmc2FsZXNfY2lkPTk3NjE4MDgwNyUzQSUzQTMxNTk2MTYwNyY2T2wGndbqia4LtqpzDjRc_zYN",
      "Referer": "https://www.linkedin.com/sales/search/saved-searches/people",
      "Referrer-Policy": "strict-origin-when-cross-origin"
   },
   "body": null,
   "method": "GET"
});
```
Replace the fetch copied from people search in functions/people_search.js, change the "start" value from the
url to a variable named count, the "count" from the url value must be changed of 25 to 100.
```node
// ...
"q=savedSearch&" +
"savedSearchId=50500827&" +
"newResultsOnly=true&" +
"start=" + String(count) + "&" +
"count=100"
// ...
```
* ### company_info fetch
```node
fetch("https://www.linkedin.com/sales-api/salesApiCompanies/71261988?decoration=%28entityUrn%2Cname%2Caccount%28saved%2CnoteCount%2ClistCount%2CcrmStatus%29%2CpictureInfo%2CcompanyPictureDisplayImage%2Cdescription%2Cindustry%2Clocation%2Cheadquarters%2Cwebsite%2CrevenueRange%2CflagshipCompanyUrl%2CemployeeGrowthPercentages%2Cemployees*~fs_salesProfile%28entityUrn%2CfirstName%2ClastName%2CfullName%2CpictureInfo%2CprofilePictureDisplayImage%29%2Cspecialties%2Ctype%2CyearFounded%29", {
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
    "x-li-page-instance": "urn:li:page:d_sales2_company_index;uBoWTIN+ScaWRfsbYBSIlA==",
    "x-restli-protocol-version": "2.0.0",
    "cookie": "li_sugr=248669f8-8a6c-4bfe-a600-5635dcdb011d; bcookie=\"v=2&61e76a31-c046-4d98-8c2c-8ee2f447df62\"; bscookie=\"v=1&20211006191210caa845ea-ad33-4bc8-8fc3-fb97e9f42056AQGf7FqLvk94GsVBhKyiNfSBpdHzOcOE\"; timezone=America/Bogota; _guid=9eb18b37-19a5-42f0-a5ba-dadba388e031; aam_uuid=41029341209754532414172781260508165292; gpv_pn=www.linkedin.com%2Fpremium%2Fproducts%2F; s_tslv=1635807775071; li_rm=AQGW2D_0wxuqCAAAAXzdyvkDhNrtA7jE6JDj-FLx791sz6TdTYr3e1WXdVJXe0Z7Pz-Km2AETH92QJC0gTbczmu-i1Q0ECzH83oz39pTceiBwE8VgujUB1C5; visit=v=1&M; g_state={\"i_p\":1635815877436,\"i_l\":1}; _gcl_au=1.1.622284.1635808713; G_ENABLED_IDPS=google; li_at=AQEDATglpCsCLXKUAAABfPt0DoAAAAF9H4CSgE4AKWNyMR7ucxJgEQc0VWOXBzIBdNzSeLak0ED7Crm-e_D1D3NB5R5Y4YQKe3fuTk084GVla32aRI2oewq1ScdfA03wYbclJ36A6TRtyWhMK-2uSWHg; liap=true; JSESSIONID=\"ajax:7144628061855638597\"; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C18939%7CMCMID%7C40531383935555829624118433342738401127%7CMCAAMLH-1636911058%7C4%7CMCAAMB-1636911058%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1636313458s%7CNONE%7CMCCIDH%7C-616281000%7CvVersion%7C5.1.1; UserMatchHistory=AQI9t70dntU_SQAAAX0IAnDnjFy8af1UJqT-DAYLDxrbUlHipt12wdEYMsZGxvVFZDMdH2878R7_WdVt0MsYTfI-iF4gmvy7qBSLOUHg7kATdlL2xp7X48W86Qqm19MQf01RmVNfSbRZwbLs9qhIjnSnmIBBCsRgZs40UUwQBS4vsDrI8s79UbDUduHFp3LuqzMm8m3Ri43sWPpO2emqQge5NCRtn_NSod2-KTPZTC85RVoFI_4fQ5rmQCWb9kfXXgQ1sk3akWGR1xlN8mhi9LmwHW1RLItN5IAEAAw; AnalyticsSyncHistory=AQIwXZxhdhLTpwAAAX0IAnDnOol6rO_d9feZBRAUoAOext1WHtAePccRxO1vr1EXA9UWgwxJT49m1SLoxQ3bvQ; lms_ads=AQEoE7YL_ArQwwAAAX0IAnGXAQ7_3Aj0n6dY9DFFV_WU7SPVDUMfGWnPHRO7-dFXeYV2p4bi7dp5f0LB3zOuXmYqfvBHowZJ; lms_analytics=AQEoE7YL_ArQwwAAAX0IAnGXAQ7_3Aj0n6dY9DFFV_WU7SPVDUMfGWnPHRO7-dFXeYV2p4bi7dp5f0LB3zOuXmYqfvBHowZJ; lang=v=2&lang=en-us; lidc=\"b=TB55:s=T:r=T:a=T:p=T:g=3046:u=12:x=1:i=1636751339:t=1636825375:v=2:sig=AQEuHNXRbcJuy_Ha8i8qUPFlYoau6-aE\"; li_a=AQJ2PTEmc2FsZXNfY2lkPTk3NjE4MDgwNyUzQSUzQTMxNTk2MTYwNyY2T2wGndbqia4LtqpzDjRc_zYN",
    "Referer": "https://www.linkedin.com/sales/search/people?savedSearchId=50500827&searchSessionId=BZiMBCHNTjO6TS3O77gKFw%3D%3D",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
});
```
Replace the fetch copied from company webpage in functions/company_info.js change the company ID from url
by company variable.

```node
// ...
await fetch("https://www.linkedin.com/sales-api/salesApiCompanies/" + companyId +"?" + 
        "decoration=%28entityUrn%2" // ...
// ...
)

```

## Executing processes ⤵
With all the components installed, we can proceed to the execution of the 3 main processes:

1. new_profiles_scraper.js: This script is who performs the scraping from the LinkedIn web filter search,
   in this case for retrieve the new profiles founded in a saved search in Sales Navigator.
```bash
/founder_scout~$ node new_profiles_scraper.js
```
2. functions/send_email.js: This script will send a daily notification with the founders added from the
   previous day to the specified recipients.
```bash
/founder_scout~$ node functions/send_email.js
```
3. src/index.js: This script launch the REST API using Express (the example usages is shown in
   requests.http file).
```bash
/founder_scout~$ npm start
```

## Automate processes 🔃
The processes explained above are required to be automatic and at certain times, that is why PM2
was used (it is advisable to use it only on servers and not on local machines since multiple processes
can be opened).We will show below how they should be executed:
```bash
/founder_scout~$ pm2 start new_profiles_scraper.js -n new_profiles_scraper --cron "0 8 * * *" -i 0
```
This process will be executed when the user types Enter on this command and the next times every day at
8:00 a.m in Cluster mode (note that is the server hour)

```bash
/founder_scout~$ pm2 start functions/send_email.js -n send_email --cron "0 13 * * *" -i 0
```
This process will be executed when the user types Enter on this command and the next times every day at
1:00 p.m in Cluster mode (note that is the server hour)

```bash
/founder_scout~$ tmux new-session -d 'npm start'
```
For launch the REST API on the server, this is a way that runs this process in background, to access this
we need to execute the following command:
```bash
/founder_scout~$ tmux a
```

## Authors 📝
* [Angui Clavijo](https://github.com/angie-clavijo-desarrollo)
* [Cristian Pinzón](https://github.com/faykris)
![](images/title fs.png)

© Designed by The Code Troopers team (Holberton Cohort 14), all rights reserved.
