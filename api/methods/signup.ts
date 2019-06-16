import {
  APIGatewayEvent,
  APIGatewayEventRequestContext,
  APIGatewayProxyCallback
} from "aws-lambda";
import { subscribe } from "../services";
import { MailchimpSubscribeParams } from "../types";

export const subscribeUser = async (
  event: APIGatewayEvent,
  context: APIGatewayEventRequestContext,
  callback: APIGatewayProxyCallback
) => {
  try {
    const { name, email } =
      typeof event.body === "string" ? JSON.parse(event.body) : event.body;

    const result = await subscribe({
      name,
      email_address: email
    } as MailchimpSubscribeParams);
    console.log(result);
    callback(null, {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify("Success")
    });
  } catch (err) {
    callback(err);
  }
};
