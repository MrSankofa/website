import crypto from "crypto";
import SquareConnect from "square-connect";
const Square = SquareConnect.ApiClient.instance;
let oauth2 = Square.authentications["oauth2"];
oauth2.accessToken = process.env.SQUARE_ACCESS_TOKEN;
export const transactions = new SquareConnect.V1TransactionsApi();
export const items = new SquareConnect.V1ItemsApi();

export const validateSquareSignature = (
  notificationBody,
  notificationSignature,
  notificationUrl,
  webhookSignatureKey
) => {
  let stringToSign = `${notificationUrl}${notificationBody}`;

  let stringSignature = Buffer.from(
    crypto
      .createHmac("sha1", webhookSignatureKey)
      .update(stringToSign)
      .digest("hex")
  ).toString("base64");

  console.log(stringSignature, notificationSignature);

  return stringSignature === notificationSignature;
};
