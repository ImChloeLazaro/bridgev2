const mongoose = require('mongoose');
const leaveModel = require('/opt/schema/leaveSchema.js');
const leaveRequestModel = require('/opt/schema/leaverequestSchema.js');
const limiter = require('/opt/helpers/limiter.js');
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(limiter)
// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

mongoose.connect(process.env.DATABASE)

app.get('/leaverequest', async function (req, res) {
  const read = await leaveModel.find()
  res.json({ success: 'get call succeed!', message: read });
});

app.get('/leaverequest/*', async function (req, res) {
  try {
    const proxy = req.path;
    const { sub } = req.query;
    switch (proxy) {
      case '/leaverequest/myLeaveRequest':
        const request = await leaveRequestModel.find({ sub })
        res.status(200).json({ success: true, response: request });
        break;
      default:
        res.status(200).json({ success: true, response: "NO ROUTES INCLUDE" });
        break;
    }
  } catch (error) {
    res.json(error)
  }
});

app.post('/leaverequest', async function (req, res) {
  const {
    sub,
    leaveDate,
    leaveType,
    numberOfHours,
    reason,
    borrowedLeave
  } = req.body

  const insert = await leaveRequestModel.create({
    sub,
    leaveDate,
    leaveType,
    numberOfHours,
    reason,
    borrowedLeave
  })

  res.json({ success: true, body: insert });
});

app.post('/leaverequest/*', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

/****************************
* Example put method *
****************************/

app.put('/leaverequest', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

app.put('/leaverequest/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

/****************************
* Example delete method *
****************************/

app.delete('/leaverequest', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/leaverequest/*', function (req, res) {
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
