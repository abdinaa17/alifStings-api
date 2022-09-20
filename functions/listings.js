require('dotenv').config()
const Airtable = require('airtable-node');
 
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_APIKEY })
  .base(process.env.AIRTABLE_BASE)
  .table('listings')

exports.handler = async (event, context) => {
  try {
    const {records} = await airtable.list()
    const listings = records.map((listing)=> {

      const {id} = listing;
      const {title, images,rating, address} = listing.fields;
      const url = images[0].url 

      return {id, title, url, rating, address }

    })
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 200,
      body: JSON.stringify(listings)
    }

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify('Server Error')
    }
  }

  }