const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const mongoose = require("mongoose")
// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

mongoose.connect(process.env.DATABASE)

const shortcutSchema = mongoose.Schema({
  suerid: String,
  title: String,
  url: String,
  createdBy: {
    type: Date,
    default: Date.now()
  }
})

const shortcutModel = mongoose.model('shortcut', shortcutSchema)

app.get('/shortcut', async function (req, res) {
   const query = req.query;
   res.json({
    message: 'access complete',
    event: req.apiGateway.event, // to view all event data
    query: query
  });
});

app.get('/shortcut/*', function (req, res) {
  res.json({ success: 'post call succeed!', url: req.url })
});

app.post('/shortcut', async function (req, res) {
  const { userid, title, url } = req.body

  try {
    const shortcutQuery = await shortcutModel.create({
      userid,
      title,
      url,
    })
    res.status(200).
      json({
        message: 'POST SUCCESS',
        response: shortcutQuery
      })
  } catch (error) {
    res.status(500).
      json({
        message: error
      })
  }

});

app.post('/shortcut/*', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

/****************************
* Example put method *
****************************/

app.put('/shortcut', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

app.put('/shortcut/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

/****************************
* Example delete method *
****************************/

app.delete('/shortcut', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/shortcut/*', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
