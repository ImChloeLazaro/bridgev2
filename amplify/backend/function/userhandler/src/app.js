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

mongoose.connect(process.env.DATABASE,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const roleSchema = mongoose.Schema({
  name : String,
  permissions : String
})

const userSchema = mongoose.Schema({
  sub : String,
  email : String,
  name : String,
  hasOnboardingData : {
    type : Boolean,
    default : false
  },
  role : {
    type : [roleSchema],
    default : [{name: 'USER', permissions: 'USER'}]
  },
  createdBy: {
    type: Date,
    default: Date.now()
  }
})

const userModel = mongoose.model('user', userSchema)

app.get('/user', async function(req, res) {
  const {sub} = req.query
  const read = await userModel.findOne({sub})
  res.json({success: 'get call succeed!', result: read});
});

app.post('/user', async function(req, res) {
  const {sub, name, email} = req.body

  try {
    const getuserbysub = await userModel.findOne({sub})
  
    if(!getuserbysub){
      const insert = await userModel.create({
      sub,
      name,
      email
    }) 
    res.status(200).json({success: 'NEW USER DETECTED! INITIAL DATA INSERT SUCCESS', result : insert})
    }
    res.status(200).json({success: 'DATA FETCHED', result : getuserbysub})
  } catch (error) {
    res.status(500).json({success: 'NEW USER DETECTED! INITIAL DATA INSERT FAILED', error: error})
  }
});

app.post('/user/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/user', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/user/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/user', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/user/*', function(req, res) {
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
