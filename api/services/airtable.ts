import Airtable from "airtable";
const { AIRTABLE_KEY, WEBSITE_BASE_ID, OS_BASE_ID } = process.env;
const airtable = new Airtable({ apiKey: AIRTABLE_KEY });

export const website = airtable.base(WEBSITE_BASE_ID as string);
export const oneSunday = airtable.base(OS_BASE_ID as string);
