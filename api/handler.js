const { getLayout } = require("./methods/website");
const { square } = require("./methods/webhooks");
const { subscribeUser } = require("./methods/signup");

const layout = async (event, context, callback) => {
  await getLayout(event, context, callback);
};

const webhook = async (event, context, callback) => {
  await square(event, context, callback);
};

const signup = async (event, context, callback) => {
  await subscribeUser(event, context, callback);
}

module.exports = {
  layout,
  webhook,
  signup
};
