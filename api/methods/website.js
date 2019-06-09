const Promise = require("bluebird");
const { website } = require("../services/airtable");

const getLayout = async (event, context, callback) => {
  try {
    let currentHomePage = (await website("Home")
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
    let result = await Promise.map(
      currentLayout,
      async id => (await website("Layout").find(id))._rawJson
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
};

module.exports = {
  getLayout
};
