"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
const lodash_1 = __importDefault(require("lodash"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const services_1 = require("../services");
exports.square = (event, context, callback) =>
  __awaiter(this, void 0, void 0, function*() {
    try {
      let result = {};
      let { location_id, entity_id, event_type } =
        typeof event.body === "string" ? JSON.parse(event.body) : event.body;
      console.log("Invoked with: ", event.headers, event.body);
      let isValid = services_1.validateSquareSignature(
        event.body,
        event.headers["X-Square-Signature"],
        process.env.SQUARE_WEBHOOK_NOTIFICATION_URL,
        process.env.SQUARE_WEBHOOK_SIGNATURE_KEY
      );
      if (!isValid) console.warn("Signatures don't match.");
      switch (event_type) {
        case "PAYMENT_UPDATED":
          let quarterName = `Q${moment_timezone_1
            .default()
            .quarter()} ${moment_timezone_1.default().year()}`;
          let beginTime = moment_timezone_1
            .default()
            .quarter(moment_timezone_1.default().quarter())
            .startOf("quarter")
            .format();
          let tx = yield services_1.transactions.retrievePayment(
            location_id,
            entity_id
          );
          let quarters = yield services_1
            .oneSunday("Reports")
            .select({ view: "All" })
            .all();
          let currentQuarter = lodash_1.default.find(
            quarters,
            q => q.get("Quarter") === quarterName
          );
          let itemizations = yield bluebird_1.map(tx.itemizations, item =>
            __awaiter(this, void 0, void 0, function*() {
              let fetchItem = yield services_1
                .oneSunday("Inventory")
                .select({
                  view: "All",
                  filterByFormula: `{Name} = "${item.name}"`
                })
                .all();
              if (fetchItem.length)
                return { square: item, airtable: fetchItem[0] };
              else throw new Error("Inventory doesn't match.");
            })
          );
          yield bluebird_1.map(itemizations, item =>
            services_1.oneSunday("Inventory").update(item.airtable.id, {
              "# Sold": item.airtable.get("# Sold") + item.square.quantity
            })
          );
          yield services_1.oneSunday("Reports").update(currentQuarter.id, {
            "Gross Income":
              currentQuarter.get("Gross Income") +
              tx.gross_sales_money.amount / 100,
            Transactions: currentQuarter.get("Transactions") + 1,
            "Items Sold":
              currentQuarter.get("Items Sold") + tx.itemizations.length,
            "Cost of Goods Sold": lodash_1.default.reduce(
              itemizations,
              (sum, next) =>
                sum +
                next.airtable.get("Wholesale Unit Price") *
                  next.square.quantity,
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
  });
//# sourceMappingURL=webhooks.js.map
