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
const services_1 = require("../services");
exports.subscribeUser = (event, context, callback) =>
  __awaiter(this, void 0, void 0, function*() {
    try {
      const { name, email } =
        typeof event.body === "string" ? JSON.parse(event.body) : event.body;
      const result = yield services_1.subscribe({ name, email_address: email });
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
  });
//# sourceMappingURL=signup.js.map
