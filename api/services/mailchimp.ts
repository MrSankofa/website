import Mailchimp from "mailchimp-api-v3";
const { MAILCHIMP_APIKEY, MAILCHIMP_LIST_ID } = process.env;

const mailchimp = new Mailchimp(MAILCHIMP_APIKEY);

export const subscribe = ({ name, email_address, status = "subscribed" }) => {
  const tokenizedName = name.split(" ");
  const FNAME = tokenizedName.length ? tokenizedName[0] : "";
  const LNAME = tokenizedName.length > 1 ? tokenizedName[1] : "";
  return mailchimp.post(`/lists/${MAILCHIMP_LIST_ID}/members`, {
    email_address,
    status,
    merge_fields: {
      FNAME,
      LNAME
    }
  });
};
