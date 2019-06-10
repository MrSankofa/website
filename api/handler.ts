import {
  APIGatewayEvent,
  Context,
  ProxyCallback,
  ProxyResult
} from "aws-lambda";
import { getLayout, square, subscribeUser } from "./methods";

export const layout = async (
  event: APIGatewayEvent,
  context: Context,
  callback: ProxyCallback
) => {
  await getLayout(event, context, callback);
};

export const webhook = async (
  event: APIGatewayEvent,
  context: Context,
  callback: ProxyCallback
) => {
  await square(event, context, callback);
};

export const signup = async (
  event: APIGatewayEvent,
  context: Context,
  callback: ProxyCallback
) => {
  await subscribeUser(event, context, callback);
};
