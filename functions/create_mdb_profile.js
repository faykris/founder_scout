export default async function create_mdb_profile(person, company) {
  const linkedInProfile = "https://www.linkedin.com/in/";
  const linkedInCompany = "https://www.linkedin.com/company/";
  let profileDict = { "profileInfo": {}, "companyInfo": { "location": {}, "createdAt": {} } };
  let companyId = String(person.currentPositions[0].companyUrn).split(':')[3];
  let profileUrl = String(person.entityUrn).split(/[()]+/)[1];
  let vmid = String(person.entityUrn).split(/[(),]+/)[1];

  profileDict.profileInfo.vmid = vmid;
  profileDict.profileInfo.profileUrl = linkedInProfile + profileUrl + '/';
  profileDict.profileInfo.linkedInProfileUrl = linkedInProfile + vmid + '/';
  profileDict.profileInfo.firstName = person.firstName;
  profileDict.profileInfo.lastName = person.lastName;
  profileDict.profileInfo.fullName = person.fullName;
  profileDict.profileInfo.title = person.currentPositions[0].title;
  profileDict.profileInfo.location = person.geoRegion;
  profileDict.profileInfo.isPremium = person.premium;
  if (person.profilePictureDisplayImage !== undefined) {
    profileDict.profileInfo.profileImageUrl = person.profilePictureDisplayImage.rootUrl +
      person.profilePictureDisplayImage.artifacts[0].fileIdentifyingUrlPathSegment;
  }
  if (company.headquarters !== undefined) {
    profileDict.companyInfo.location.country = company.headquarters.country;
    profileDict.companyInfo.location.city = company.headquarters.city;
  }
  if (person.currentPositions[0].startedOn !== undefined) {
    profileDict.companyInfo.createdAt.month = person.currentPositions[0].startedOn.month;
    profileDict.companyInfo.createdAt.year = person.currentPositions[0].startedOn.year;
  }
  profileDict.companyInfo.companyId = companyId;
  profileDict.companyInfo.companyUrl = linkedInCompany + companyId + '/';
  profileDict.companyInfo.websiteUrl = company.website;
  profileDict.companyInfo.companyName = person.currentPositions[0].companyName;
  profileDict.companyInfo.industry = company.industry;
  if (company.companyPictureDisplayImage !== undefined) {
    profileDict.companyInfo.companyImageUrl = company.companyPictureDisplayImage.rootUrl +
      company.companyPictureDisplayImage.artifacts[0].fileIdentifyingUrlPathSegment;
  }
  profileDict.companyInfo.summary = company.description;
  profileDict.companyInfo.timestamp = new Date().toISOString();

  return profileDict;
}
