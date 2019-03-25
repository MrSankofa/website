const { getLayout } = require('./layout')

const layout = async (event, context, callback) => {
  await getLayout(callback)
}

module.exports = {
  layout
}