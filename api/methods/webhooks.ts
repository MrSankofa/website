import { map } from "bluebird";
import _ from "lodash";
import moment from "moment-timezone";
import {
  items,
  transactions,
  validateSquareSignature,
  oneSunday
} from "../services";

export const square = async (event, context, callback) => {
  try {
    let result = {};
    let { location_id, entity_id, event_type } =
      typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    console.log("Invoked with: ", event.headers, event.body);

    let isValid = validateSquareSignature(
      event.body,
      event.headers["X-Square-Signature"],
      process.env.SQUARE_WEBHOOK_NOTIFICATION_URL,
      process.env.SQUARE_WEBHOOK_SIGNATURE_KEY
    );
    if (!isValid) console.warn("Signatures don't match.");

    switch (event_type) {
      case "PAYMENT_UPDATED":
        let quarterName = `Q${moment().quarter()} ${moment().year()}`;
        let beginTime = moment()
          .quarter(moment().quarter())
          .startOf("quarter")
          .format();
        let tx = await transactions.retrievePayment(location_id, entity_id);
        let quarters = await oneSunday("Reports")
          .select({ view: "All" })
          .all();
        let currentQuarter = _.find(
          quarters,
          q => q.get("Quarter") === quarterName
        );
        let itemizations = await map(tx.itemizations, async item => {
          let fetchItem = await oneSunday("Inventory")
            .select({ view: "All", filterByFormula: `{Name} = "${item.name}"` })
            .all();
          if (fetchItem.length) return { square: item, airtable: fetchItem[0] };
          else throw new Error("Inventory doesn't match.");
        });
        await map(itemizations, item =>
          oneSunday("Inventory").update(item.airtable.id, {
            "# Sold": item.airtable.get("# Sold") + item.square.quantity
          })
        );
        await oneSunday("Reports").update(currentQuarter.id, {
          "Gross Income":
            currentQuarter.get("Gross Income") +
            tx.gross_sales_money.amount / 100,
          Transactions: currentQuarter.get("Transactions") + 1,
          "Items Sold":
            currentQuarter.get("Items Sold") + tx.itemizations.length,
          "Cost of Goods Sold": _.reduce(
            itemizations,
            (sum, next) =>
              sum +
              next.airtable.get("Wholesale Unit Price") * next.square.quantity,
            0
          ),
          "Sales Tax Collected":
            currentQuarter.get("Sales Tax Collected") +
            tx.tax_money.amount / 100,
          "CC Processing Fees":
            currentQuarter.get("CC Processing Fees") +
            -tx.processing_fee_money.amount / 100,
          Refunds:
            currentQuarter.get("Refunds") + -tx.refunded_money.amount / 100
        });
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
  } catch (err) {
    console.log(err);
    callback(err);
  }
};
