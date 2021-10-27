import Airtable from "airtable";
import dotenv from 'dotenv';

dotenv.config();
const base = new Airtable({apiKey: process.env.APY_KEY}).base(process.env.BASE_ID);

await base('co-founders').create([
  {
    "fields": {
      "vmid":"ACwAACXCyHYBnjhcIg8uWa9gJx55dHmiF1OTkvk",
      "profileUrl":"https://www.linkedin.com/in/ACwAACXCyHYBnjhcIg8uWa9gJx55dHmiF1OTkvk,OUT_OF_NETWORK,bDPh/",
      "linkedInProfileUrl":"https://www.linkedin.com/in/ACwAACXCyHYBnjhcIg8uWa9gJx55dHmiF1OTkvk/",
      "firstName":"Thibault",
      "lastName":"Dambrun",
      "fullName":"Thibault Dambrun",
      "title":"Co-Founder & CTO","location":"Voisins-le-Bretonneux, Île-de-France, France",
      "isPremium":false,
      "profileImageUrl":"https://media-exp1.licdn.com/dms/image/C4D03AQH_5UlyJ3pVdQ/profile-displayphoto-shrink_100_100/0/1580861074780?e=1640822400&v=beta&t=Kj2oF8BRJ0mBHlg_O9LidLSXeM7O-wcUn6MZXo5hvgw",
      "country":"Senegal",
      "city":"Dakar",
      "month":3,
      "year":2021,
      "companyId":72142728,
      "companyUrl":"https://www.linkedin.com/company/72142728/",
      "companyName":"KimiaPay ",
      "industry":"Financial Services",
      "companyImageUrl":"https://media-exp1.licdn.com/dms/image/C4D0BAQGhx9SugjzMbg/company-logo_200_200/0/1618393056675?e=1643241600&v=beta&t=Je1sN7cZYnel6LuLmOC8SRmP5iC8HU0viOt3bnYjUV4",
      "timestamp":"2021-10-25"
    }
  }
]).then(async (record) => console.log(record[0].fields))
  .catch(async (err) => console.log("X( - Error creating profile on Airtable:\n", err.message));
