const Airtable = require('airtable')
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE_ID)
const Promise = require('bluebird')

const getLayout = async (callback) => {
  try {
    let currentHomePage = (await airtable('Home').select({ maxRecords: 1, filterByFormula: 'IS_AFTER(NOW(), {Start})' }).firstPage())[0]
    let currentLayout = [
      currentHomePage.get('Tile 1'),
      currentHomePage.get('Tile 2'),
      currentHomePage.get('Tile 3'),
      currentHomePage.get('Tile 4'),
      currentHomePage.get('Tile 5'),
      currentHomePage.get('Tile 6')
    ]

    callback(null, {
      statusCode: 200,
      headers: {
        "Content-Type" : "application/json",
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true
      },
      body: JSON.stringify(await Promise.map(currentLayout, async (id) => (await airtable('Layout').find(id))._rawJson))
    })
  } catch (err) {
    callback(err)
  } 
}

module.exports = {
  getLayout
}