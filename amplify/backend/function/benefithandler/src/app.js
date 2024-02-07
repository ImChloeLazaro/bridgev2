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

const default_benefits = [
  {
    name: "HMO",
    number: "###-###-####",
    status: "pending",
    availability: "pending"
  },
  {
    name: "PAGIBIG",
    number: "###-###-####",
    status: "pending",
    availability: "pending"
  },
  {
    name: "SSS",
    number: "###-###-####",
    status: "pending",
    availability: "pending"
  },
  {
    name: "PhilHealth",
    number: "###-###-####",
    status: "pending",
    availability: "pending"
  }
]

const benefit = mongoose.Schema({
  name: String,
  number: String,
  status: String,
  availability: String,
})

const benefitSchema = mongoose.Schema({
  sub: String,
  benefits: {
    type: [benefit],
    default: default_benefits
  }
})

const benefitModel = mongoose.model('benefit', benefitSchema)

app.get('/benefits', async function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/benefits/*', async function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.post('/benefits', async function(req, res) {
  try {
    const { sub } = req.body
    const insert = await benefitModel.create({ sub })
    res.json({success: true, response: insert})
  } catch (error) {
    res.json({error: error})
  }
});

app.post('/benefits/*', function(req, res) {
  // Add your code here
  res.json({success: success, url: req.url, body: req.body})
});

app.put('/benefits', async function(req, res) {
  const newBenefitData = {
    name: "New Benefit",
    number: "###-###-####",
    status: "pending",
    availability: "pending"
  };
  const  sub  = 'd0229811-67cc-4fb8-915b-38d8029b85df'
  const benefit = await benefitModel.updateOne({sub}, {$push: {benefits: newBenefitData}}, {new: false})
  res.json({success: true, response: benefit})
});

app.put('/benefits/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/benefits', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/benefits/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
