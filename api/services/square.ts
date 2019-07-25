import crypto from "crypto";
import {
  ApiClient,
  V1TransactionsApi,
  V1ItemsApi,
  CustomersApi
} from "square-connect";
import { NoSignatureKeyError } from "../errors";
// @ts-ignore
const Square = ApiClient.instance;
let oauth2 = Square.authentications["oauth2"];
oauth2.accessToken = process.env.SQUARE_ACCESS_TOKEN;
export const transactions = new V1TransactionsApi();
export const customers = new CustomersApi();
export const items = new V1ItemsApi();

export const validateSquareSignature = (
  notificationBody: string,
  notificationSignature: string,
  notificationUrl: string | undefined,
  webhookSignatureKey: string | undefined
) => {
  if (webhookSignatureKey) {
    let stringToSign = `${notificationUrl}${notificationBody}`;

    let stringSignature = Buffer.from(
      crypto
        .createHmac("sha1", webhookSignatureKey)
        .update(stringToSign)
        .digest("hex")
    ).toString("base64");

    return stringSignature === notificationSignature;
  } else throw new NoSignatureKeyError();
};
