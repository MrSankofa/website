const Promise = require("bluebird");
const { subscribe } = require("../services/mailchimp");

const subscribeUser = async (event, context, callback) => {
  try {
    const { name, email } =
      typeof event.body === "string" ? JSON.parse(event.body) : event.body;

    const result = await subscribe({ name, email_address: email })
    console.log(result)
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

module.exports = {
  subscribeUser
};
