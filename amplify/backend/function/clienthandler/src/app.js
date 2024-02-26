const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const mongoose = require('mongoose')
// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

mongoose.connect(process.env.DATABASE)

const clientSchema = mongoose.Schema({
  contact: {
    name: String,
    address: String,
    number: String,
    email: String,
  },
  company: {// Company details
    name: String,
    address: String,
    contact_number: String,
    email: String,
    ABN: String,
    ACN: String,
    other_owner: Boolean,
  },
  business: { // Business details
    description: String,
    entity: String,
    tenure: String,
    trading_name: String,
  },
  financial: { // Financial details
    monthly_revenue: String,
    employee_count: Number,
    contractors_count: Number,
    has_outsource_payroll: Boolean,
    accounts: Number,
    monthly_transactions_count: Number,
    last_filed_tax: Date,
    accounting_method: String,
    invoice_preparation_method: String,
    bills_paying_method: String,
    is_GST_registered: Boolean,
    has_inventory: Boolean,
  },
  software: { // Software details
    accounting: [String],
    payroll: [String],
    billing: [String],
    expense_management: [String],
    reporting: [String],
    bookkeeping: [String],
  },
  documents: {
    ASIC: String, //ASIC company registration certificate or trust deed.
    tax_return: String, //previous year financial year
  },
  another_bookkeeper: Boolean,
  with_accountant: Boolean
})

const clientModel = mongoose.model('Client', clientSchema)

app.get('/cms/client', async function(req, res) {
  try {
    const read = await clientModel.find()
    res.json({ success: true, response: 'test' })
  } catch (error) {
    res.json({ error: error })
  }
});

app.get('/cms/client/*', async function(req, res) {
  try {
    const { _id } = req.query
    const read = await clientModel.findOne({_id})
    res.json({ success: true, response: read })
  } catch (error) {
    res.json({ error: error })
  }
});

app.post('/cms/client', async function(req, res) {
  try {
    const { contact, company, business, financial, software, documents, another_bookkeeper, with_accountant } = req.body
    const insert = await clientModel.create({ 
      contact, 
      company, 
      business, 
      financial, 
      software, 
      documents, 
      another_bookkeeper, 
      with_accountant 
    })
    res.json({ success: true, response: insert })
  } catch (error) {
    res.json({ error: error })
  }
});

app.put('/cms/client', async function(req, res) {
    try {
    const { _id, contact, company, business, financial, software, documents, another_bookkeeper, with_accountant } = req.body
    const update = await clientModel.UpdateOne({ _id }, { 
      contact, 
      company, 
      business, 
      financial, 
      software, 
      documents, 
      another_bookkeeper, 
      with_accountant })
    res.json({ success: true, response: update })
  } catch (error) {
    res.json({ error: error })
  }
});


app.delete('/cms/client', async function(req, res) {
  try {
    const { _id } = req.body
    const destroy = await clientModel.deleteOne({ _id })
    res.json({ success: true, response: destroy })
  } catch (error) {
    res.json({ error: error })
  }
});

app.listen(3000, function() {
    console.log("App started")
});

module.exports = app
