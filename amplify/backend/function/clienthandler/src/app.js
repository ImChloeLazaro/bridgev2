const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const mongoose = require('mongoose')
const clientModel = require('/opt/schema/cmsClientSchema.js')
const limiter = require('/opt/helpers/limiter.js')
// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(limiter)
// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

mongoose.connect(process.env.DATABASE)

app.get('/cms/client', async function(req, res) {
  try {
    const read = await clientModel.find()
    res.status(200).json({ success: true, response: read })
  } catch (error) {
    res.json({ error: error })
  }
});

app.get('/cms/client/*', async function(req, res) {
  try {
    const { _id } = req.query
    const read = await clientModel.findOne({_id})
    res.status(200).json({ success: true, response: read })
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
    res.status(200).json({ success: true, response: insert })
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
    res.status(200).json({ success: true, response: update })
  } catch (error) {
    res.json({ error: error })
  }
});


app.delete('/cms/client', async function(req, res) {
  try {
    const { _id } = req.query
    const destroy = await clientModel.deleteOne({ _id: _id })
    res.status(200).json({ success: true, response: destroy })
  } catch (error) {
    res.json({ error: error })
  }
});

app.listen(3000, function() {
    console.log("App started")
});

module.exports = app
