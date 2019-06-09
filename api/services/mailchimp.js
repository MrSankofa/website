const Mailchimp = require('mailchimp-api-v3')

const mailchimp = new Mailchimp(process.env.MAILCHIMP_APIKEY);

module.exports = {
  subscribe: ({ name, email_address, status = 'subscribed' }) => {
    const tokenizedName = name.split(' ')
    const FNAME = tokenizedName.length ? tokenizedName[0] : ''
    const LNAME = tokenizedName.length > 1 ? tokenizedName[1] : ''
    return mailchimp.post(`/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
      email_address,
      status,
      merge_fields: {
        FNAME,
        LNAME
      }
    })
  }
}