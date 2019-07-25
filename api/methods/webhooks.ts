import _ from "lodash";
import {
  APIGatewayEvent,
  APIGatewayEventRequestContext,
  APIGatewayProxyCallback
} from "aws-lambda";
import { transactions, customers, subscribe } from "../services";
import { RequestBody, MailchimpSubscribeParams } from "../types";
import { NoBodyError, SignatureMismatchError } from "../errors";
import { V1Payment, Tender } from "square-connect";
/*const {
  SQUARE_WEBHOOK_NOTIFICATION_URL,
  SQUARE_WEBHOOK_SIGNATURE_KEY
} = process.env;*/

export const square = async (
  event: APIGatewayEvent,
  context: APIGatewayEventRequestContext,
  callback: APIGatewayProxyCallback
) => {
  try {
    let result = {};
    if (typeof event.body === "string") event.body = JSON.parse(event.body);
    let { body } = event;
    if (body) {
      let { location_id, entity_id, event_type }: RequestBody = body as any;
      console.log(body);
      /*let isValid = validateSquareSignature(
        body,
        headers["X-Square-Signature"],
        SQUARE_WEBHOOK_NOTIFICATION_URL,
        SQUARE_WEBHOOK_SIGNATURE_KEY
      );*/
      let isValid = true;
      if (isValid) {
        /*const Q1 = moment(`${moment().year() - 1}-12-01T00:00:00.000Z`);
        const Q2 = moment(`${moment().year()}-03-01T00:00:00.000Z`);
        const Q3 = moment(`${moment().year()}-06-01T00:00:00.000Z`);
        const Q4 = moment(`${moment().year()}-09-01T00:00:00.000Z`);

        const getQuarterNumber = () => {
          if (moment().isBetween(Q1, Q2)) return 1;
          else if (moment().isBetween(Q2, Q3)) return 2;
          else if (moment().isBetween(Q3, Q4)) return 3;
          else return 4;
        };*/

        switch (event_type) {
          case "PAYMENT_UPDATED":
            //let tx: V1Payment = await transactions.retrievePayment(location_id, entity_id);
            break;
        }

        callback(null, {
          statusCode: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify(result)
        });
      } else throw new SignatureMismatchError();
    } else throw new NoBodyError();
  } catch (err) {
    console.log(err);
    callback(err);
  }
};
