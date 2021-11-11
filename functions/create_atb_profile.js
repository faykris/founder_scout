export default async function create_atb_profile(profileDict) {
  const airtableDict = {"fields":{}};
  const airtableList = [];

  airtableDict.fields.vmid = profileDict.profileInfo.vmid;
  airtableDict.fields.profileUrl = profileDict.profileInfo.profileUrl;
  airtableDict.fields.linkedInProfileUrl = profileDict.profileInfo.linkedInProfileUrl;
  airtableDict.fields.firstName = profileDict.profileInfo.firstName;
  airtableDict.fields.lastName = profileDict.profileInfo.lastName;
  airtableDict.fields.fullName = profileDict.profileInfo.fullName;
  airtableDict.fields.title = profileDict.profileInfo.title;
  airtableDict.fields.location = profileDict.profileInfo.location;
  airtableDict.fields.isPremium = profileDict.profileInfo.isPremium;
  airtableDict.fields.profileImageUrl = profileDict.profileInfo.profileImageUrl;
  airtableDict.fields.companyId = parseInt(profileDict.companyInfo.companyId);
  airtableDict.fields.companyUrl = profileDict.companyInfo.companyUrl;
  airtableDict.fields.websiteUrl = profileDict.companyInfo.websiteUrl;
  airtableDict.fields.companyName = profileDict.companyInfo.companyName;
  airtableDict.fields.industry = profileDict.companyInfo.industry;
  airtableDict.fields.country = profileDict.companyInfo.location.country;
  airtableDict.fields.city = profileDict.companyInfo.location.city;
  airtableDict.fields.month = profileDict.companyInfo.createdAt.month;
  airtableDict.fields.year = profileDict.companyInfo.createdAt.year;
  airtableDict.fields.companyImageUrl = profileDict.companyInfo.companyImageUrl;
  airtableDict.fields.description = profileDict.companyInfo.summary;
  airtableDict.fields.timestamp = profileDict.companyInfo.timestamp.substr(0,10);

  airtableList.push(airtableDict);
  return airtableList;
}
