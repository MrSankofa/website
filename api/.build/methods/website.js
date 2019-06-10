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
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
const services_1 = require("../services");
exports.getLayout = (event, context, callback) =>
  __awaiter(this, void 0, void 0, function*() {
    try {
      let currentHomePage = (yield services_1
        .website("Home")
        .select({ maxRecords: 1, filterByFormula: "IS_AFTER(NOW(), {Start})" })
        .firstPage())[0];
      let currentLayout = [
        currentHomePage.get("Tile 1"),
        currentHomePage.get("Tile 2"),
        currentHomePage.get("Tile 3"),
        currentHomePage.get("Tile 4"),
        currentHomePage.get("Tile 5"),
        currentHomePage.get("Tile 6")
      ];
      let result = yield bluebird_1.map(currentLayout, id =>
        __awaiter(this, void 0, void 0, function*() {
          return (yield services_1.website("Layout").find(id))._rawJson;
        })
      );
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
      callback(err);
    }
  });
//# sourceMappingURL=website.js.map
