const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const departmentModel = require('/opt/schema/departmentSchema.js')
const limiter = require('/opt/helpers/limiter.js')
const mongoose = require("mongoose")
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

app.get('/teams/department', async function(req, res) {
  try {
    const department = await departmentModel.find()
    res.status(200).json({ success: true, response: department})
  } catch (error) {
    res.json({ error: error });  
  }
});

app.post('/teams/department', async function(req, res) {
  try {
    const department = await departmentModel.create(req.body)
    res.status(200).json({ success: true, response: department})
  } catch (error) {
    res.json({ error: error });
  }  
});

app.put('/teams/department', async function(req, res) {
  // Add your code here
  res.json({success: 'PUT TEAMS DEPARTMENT!', url: req.url, body: req.body})
});

app.delete('/teams/department', async function(req, res) {
 try {
    const department = await departmentModel.delete(req.body)
    res.status(200).json({ success: true, response: department})
 } catch (error) {
    res.json({ error: error });
 }
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
