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

mongoose.connect(process.env.DATABASE);

const taskSchema = mongoose.Schema({
  name : String,
  client : {
    name : String,
    email : String,
    picture : String
  },
  processor : [
    {
      sub: String,
      name: String,
      email: String,
      picture: String
    }
  ],
  reviewer : [
    {
      sub: String,
      name: String,
      email: String,
      picture: String
    }
  ],
  duration: {
    start: Date,
    end: Date
  },
  status: String,
})

app.get('/cms/task', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.post('/cms/task', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.put('/cms/task', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.delete('/cms/task', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

module.exports = app
