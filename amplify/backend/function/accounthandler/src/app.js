const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const mongoose = require('mongoose')
const accountModel = require('/opt/schema/accountSchema.js')
const limiter = require('/opt/helpers/limiter.js')
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

app.get('/account', function(req, res) {
  res.json({success: 'get call succeed!', url: req.url});
});

app.post('/account', function(req, res) {
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.put('/account', function(req, res) {
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.delete('/account', function(req, res) {
  res.json({success: 'delete call succeed!', url: req.url});
});


app.listen(3000, function() {
    console.log("App started")
});

module.exports = app
