"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const airtable_1 = __importDefault(require("airtable"));
const { AIRTABLE_KEY, WEBSITE_BASE_ID, OS_BASE_ID } = process.env;
const airtable = new airtable_1.default({ apiKey: AIRTABLE_KEY });
exports.website = airtable.base(WEBSITE_BASE_ID);
exports.oneSunday = airtable.base(OS_BASE_ID);
//# sourceMappingURL=airtable.js.map
