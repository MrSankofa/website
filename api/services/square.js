const crypto = require("crypto");
const SquareConnect = require("square-connect");
const Square = SquareConnect.ApiClient.instance;
let oauth2 = Square.authentications["oauth2"];
oauth2.accessToken = process.env.SQUARE_ACCESS_TOKEN;
const transactions = new SquareConnect.V1TransactionsApi();
const items = new SquareConnect.V1ItemsApi();

function validateSquareSignature(
  notificationBody,
  notificationSignature,
  notificationUrl,
  webhookSignatureKey
) {
  let stringToSign = `${notificationUrl}${notificationBody}`;

  let stringSignature = Buffer.from(
    crypto
      .createHmac("sha1", webhookSignatureKey)
      .update(stringToSign)
      .digest("hex")
  ).toString("base64");

  console.log(stringSignature, notificationSignature);

  return stringSignature === notificationSignature;
}

module.exports = {
  validateSquareSignature,
  transactions,
  items
};
