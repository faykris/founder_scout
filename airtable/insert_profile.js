import Airtable from "airtable";
import dotenv from 'dotenv';

dotenv.config();
const base = new Airtable({apiKey: process.env.APY_KEY}).base(process.env.BASE_ID);

await base('co-founders').create([
  {
    "fields": {
      "vmid":"ACwAACYfqkgBnD5-8tW07nhPEfgi-Gfd4MGzxK4",
      "profileUrl":"https://www.linkedin.com/in/ACwAACYfqkgBnD5-8tW07nhPEfgi-Gfd4MGzxK4,NAME_SEARCH,o-_d/",
      "linkedInProfileUrl":"https://www.linkedin.com/in/ACwAACYfqkgBnD5-8tW07nhPEfgi-Gfd4MGzxK4/",
      "firstName":"Kai W.",
      "lastName":"Schwab",
      "fullName":"Kai W. Schwab",
      "title":"Co-Founder",
      "location":"Zug, Zug, Switzerland",
      "isPremium":false,
      "profileImageUrl":"https://media-exp1.licdn.com/dms/image/C4D03AQE5E5uBkS-P8A/profile-displayphoto-shrink_100_100/0/1615291653999?e=1640822400&v=beta&t=ueJHHdBNedwnWo7W1AtS-iZuTJ8u5UihLhSEGQ8AwWM",
      "country":"The Bahamas",
      "city":"Nassau",
      "month":10,
      "year":2021,
      "companyId":76138192,
      "companyUrl":"https://www.linkedin.com/company/76138192/",
      "websiteUrl":"https://defiwarriors.org",
      "companyName":"DeFiWarriors",
      "industry":"Financial Services",
      "companyImageUrl":"https://media-exp1.licdn.com/dms/image/C4D0BAQGHfJn1Iu2q_A/company-logo_200_200/0/1631533036857?e=1643241600&v=beta&t=Qjog7MALqHNxVPdxshW6p3ZzwNkCh7Ec1Jbz6ZjJglw",
      "timestamp":"2021-10-25"
    }
  }
]).then(async (record) => console.log(record[0].fields))
  .catch(async (err) => console.log("X( - Error creating profile on Airtable:\n", err.message));
