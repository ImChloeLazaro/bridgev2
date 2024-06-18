const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const mongoose = require('mongoose')
const leaveModel = require('/opt/schema/leaveSchema.js')
// Declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })

app.get('/leave/*', async function(req, res) {
  try {
    const sub = req.query.sub
    const key = req.path;

    switch (key) {
      case '/leave/balance':
        const balance = await leaveModel.findOne({ sub })
        res.json({ success: true, response: balance })
        break;
      default:
        res.status(200).json({ success: true, response: "NO ROUTES INCLUDE", url: req.url });
        break;
    }
  } catch (error) {
    res.json({ error: error })
  }
});

app.get('/leave', async function(req, res) {
  try {
    const read = await leaveModel.find()
    res.json({ success: true, response: read }) 
  } catch (error) {
    res.json({ error: error })
  }
});

app.post('/leave', async function(req, res) {
  try {
    const { sub } = req.body
    const insert = await leaveModel.create({ sub })
    res.json({ success: true, response: insert })
  } catch (err) {
    res.json({ error: err })
  }
});

app.put('/leave', async function(req, res) {
  try {
    const { sub, VL_BALANCE, SL_BALANCE, reset_date } = req.body
    const update = await leaveModel.updateOne({ sub }, { VL_BALANCE, SL_BALANCE, reset_date })
    res.json({ success: true, response: update }) 
  } catch (error) {
    res.json({ error: error })
  }
});

app.delete('/leave', async function(req, res) {
  try {
    const { sub } = req.body
    const destroy = await leaveModel.deleteOne({ sub })
    res.json({ success: true, body: destroy })
  } catch (error) {
    res.json({ error: error })
  }
});

app.listen(3000, function() {
  console.log("App started")
});

module.exports = app
module.exports.leaveModel = leaveModel
