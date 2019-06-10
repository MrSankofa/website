"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const square_connect_1 = __importDefault(require("square-connect"));
const Square = square_connect_1.default.ApiClient.instance;
let oauth2 = Square.authentications["oauth2"];
oauth2.accessToken = process.env.SQUARE_ACCESS_TOKEN;
exports.transactions = new square_connect_1.default.V1TransactionsApi();
exports.items = new square_connect_1.default.V1ItemsApi();
exports.validateSquareSignature = (
  notificationBody,
  notificationSignature,
  notificationUrl,
  webhookSignatureKey
) => {
  let stringToSign = `${notificationUrl}${notificationBody}`;
  let stringSignature = Buffer.from(
    crypto_1.default
      .createHmac("sha1", webhookSignatureKey)
      .update(stringToSign)
      .digest("hex")
  ).toString("base64");
  console.log(stringSignature, notificationSignature);
  return stringSignature === notificationSignature;
};
//# sourceMappingURL=square.js.map
