const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const mongoose = require('mongoose')
const workspaceModel = require('/opt/schema/workspaceSchema.js')
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

mongoose.connect(process.env.DATABASE);

app.get('/workspace', async function(req, res) {
  try {
    const workspace = await workspaceModel.find();
    res.status(200).json({ success: true, data: workspace });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

app.get('/workspace/*', async function(req, res) {
  try {
    const proxy = req.path;
    const { managers , processors, type } = req.query;
    switch (proxy) {
      case '/workspace/personal':
        const personal = await workspaceModel.find({managers: {sub: managers}});
        res.status(200).json({ success: true, data: personal });
      break;
      case '/workspace/shared':
        const shared = await workspaceModel.find({processors: {sub: processors}});
        res.status(200).json({ success: true, data: shared });
      break;
      default:
        res.status(200).json({ success: true, response: "NO ROUTES INCLUDE" });
      break;
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

app.post('/workspace', async function(req, res) {
  try {
    const { item, managers, processors, date, dateCompleted, status, remarks, type } = req.body;
    const insert = await workspaceModel.create({ 
      item, 
      managers, 
      processors, 
      date, 
      dateCompleted, 
      status, 
      remarks, 
      type 
    });
    res.status(200).json({ success: true, response: insert, message: "Workspace created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

app.post('/workspace/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/workspace', async function(req, res) {
  try {
    const { 
      _id, 
      item,
      managers, 
      processors, 
      date, 
      dateCompleted, 
      status, 
      remarks, 
      type } = req.body;
    const update = await workspaceModel.updateOne({ 
      _id }, 
      { 
        _id, 
        item, 
        managers, 
        processors, 
        date, 
        dateCompleted, 
        status, 
        remarks, 
        type 
      });
    res.status(200).json({ success: true, response: update, message: "Workspace Updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

app.put('/workspace/*', function(req, res) {
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});


app.delete('/workspace', async function(req, res) {
  try {
    const { _id } = req.body;
    const remove = await workspaceModel.deleteOne({ _id });
    res.status(200).json({ success: true, response: remove, message: "Workspace deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

app.listen(3000, function() {
    console.log("App started")
});

module.exports = app
