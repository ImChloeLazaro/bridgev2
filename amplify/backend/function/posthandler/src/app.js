const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const mongoose = require('mongoose')

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

const taggedUserSchema = mongoose.Schema({
  sub: String,
  name: String,
  email: String,
})

const postSchema = mongoose.Schema({
  sub: String,
  title: String,
  type: String,
  caption : String,
  media : String,
  tagged_user : [taggedUserSchema],
  createdBy: {
    type: Date,
    default: Date.now()
  }
})

const postModel = mongoose.model('post', postSchema)

app.get('/post', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.post('/post', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.put('/post', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});


app.delete('/post', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

module.exports = app
