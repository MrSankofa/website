"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mailchimp_api_v3_1 = __importDefault(require("mailchimp-api-v3"));
const { MAILCHIMP_APIKEY, MAILCHIMP_LIST_ID } = process.env;
const mailchimp = new mailchimp_api_v3_1.default(MAILCHIMP_APIKEY);
exports.subscribe = ({ name, email_address, status = "subscribed" }) => {
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
//# sourceMappingURL=mailchimp.js.map
