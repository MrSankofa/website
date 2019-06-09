const Airtable = require("airtable");

module.exports = {
  website: new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(
    process.env.WEBSITE_BASE_ID
  ),
  oneSunday: new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(
    process.env.OS_BASE_ID
  )
};
