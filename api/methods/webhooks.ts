import { map } from "bluebird";
import _ from "lodash";
import moment from "moment-timezone";
import {
  APIGatewayEvent,
  APIGatewayEventRequestContext,
  APIGatewayProxyCallback
} from "aws-lambda";
import { transactions, validateSquareSignature, oneSunday } from "../services";
import { RequestBody } from "../types";
import {
  NoBodyError,
  SignatureMismatchError,
  InventoryMismatchError
} from "../errors";
import { SelectOptions, Row, Table } from "airtable";
import { V1PaymentItemization } from "square-connect";
const {
  SQUARE_WEBHOOK_NOTIFICATION_URL,
  SQUARE_WEBHOOK_SIGNATURE_KEY
} = process.env;

export const square = async (
  event: APIGatewayEvent,
  context: APIGatewayEventRequestContext,
  callback: APIGatewayProxyCallback
) => {
  try {
    let result = {};
    if (typeof event.body === "string") event.body = JSON.parse(event.body);
    let { body, headers } = event;
    if (body) {
      let { location_id, entity_id, event_type }: RequestBody = body as any;

      let isValid = validateSquareSignature(
        body,
        headers["X-Square-Signature"],
        SQUARE_WEBHOOK_NOTIFICATION_URL,
        SQUARE_WEBHOOK_SIGNATURE_KEY
      );
      if (isValid) {
        const Q1 = moment(`${moment().year() - 1}-12-01T00:00:00.000Z`);
        const Q2 = moment(`${moment().year()}-03-01T00:00:00.000Z`);
        const Q3 = moment(`${moment().year()}-06-01T00:00:00.000Z`);
        const Q4 = moment(`${moment().year()}-09-01T00:00:00.000Z`);

        const getQuarterNumber = () => {
          if (moment().isBetween(Q1, Q2)) return 1;
          else if (moment().isBetween(Q2, Q3)) return 2;
          else if (moment().isBetween(Q3, Q4)) return 3;
          else return 4;
        };

        type AirtableRow = {
          get: any;
        };

        type AirtableTable = Table<{}> & {
          update?: any;
        };

        switch (event_type) {
          case "PAYMENT_UPDATED":
            const Inventory: AirtableTable = oneSunday("Inventory");
            const Reports: AirtableTable = oneSunday("Reports");
            let quarterName = `Q${getQuarterNumber()} ${moment().year()}`;
            console.log(`Quarter: ${quarterName}`);
            let tx = await transactions.retrievePayment(location_id, entity_id);
            let quarters: readonly Row<{}>[] = await Reports.select({
              view: "All"
            }).all();
            let currentQuarter: any = _.find(
              quarters,
              (q: AirtableRow) => q.get("Quarter") === quarterName
            );
            let itemizations = tx.itemizations
              ? await map(
                  tx.itemizations,
                  async (item: V1PaymentItemization) => {
                    let fetchItem = await Inventory.select({
                      view: "All",
                      filterByFormula: `{Name} = "${item.name}"`
                    } as SelectOptions).all();
                    if (fetchItem.length)
                      return { square: item, airtable: fetchItem[0] };
                    else throw new InventoryMismatchError();
                  }
                )
              : [];

            await map(itemizations, (item: any) =>
              Inventory.update(item.airtable.id, {
                "# Sold": item.airtable.get("# Sold") + item.square.quantity
              })
            );
            if (currentQuarter && tx.itemizations) {
              await Reports.update(currentQuarter.id, {
                "Gross Income":
                  tx.gross_sales_money && tx.gross_sales_money.amount
                    ? currentQuarter.get("Gross Income") +
                      tx.gross_sales_money.amount / 100
                    : 0,
                Transactions: currentQuarter.get("Transactions") + 1,
                "Items Sold":
                  currentQuarter.get("Items Sold") + tx.itemizations.length,
                "Cost of Goods Sold": _.reduce(
                  itemizations,
                  (sum: number, next: any) =>
                    sum +
                    next.airtable.get("Wholesale Unit Price") *
                      next.square.quantity,
                  0
                ),
                "Sales Tax Collected":
                  tx.tax_money && tx.tax_money.amount
                    ? currentQuarter.get("Sales Tax Collected") +
                      tx.tax_money.amount / 100
                    : 0,
                "CC Processing Fees":
                  tx.processing_fee_money && tx.processing_fee_money.amount
                    ? currentQuarter.get("CC Processing Fees") +
                      -tx.processing_fee_money.amount / 100
                    : 0,
                Refunds:
                  tx.refunded_money && tx.refunded_money.amount
                    ? currentQuarter.get("Refunds") +
                      -tx.refunded_money.amount / 100
                    : 0
              });
            }
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
    console.error(err);
    callback(err);
  }
};
