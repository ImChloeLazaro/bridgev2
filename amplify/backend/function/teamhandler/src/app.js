const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const mongoose = require("mongoose")
const teamModel = require('/opt/schema/teamSchema.js')
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

app.get('/teams', async function(req, res) {
  try {
    const {sub} = req.query
    const team = await teamModel.find()
    res.status(200).json({ success: true, response: team})
  } catch (error) {
    res.json({ error: error }); 
  }
});

app.get('/teams/*', async function(req, res) {
  try {
    const sub = req.query.sub; // Extract sub from query parameters
    const key = req.path; // Use req.path to get the URL path
    switch (key) {
      case '/teams/employee':
        const employee_team = await teamModel.findOne({sub: sub})
        res.json({ success: true, route: "EMPLOYEE TEAM ROUTE", response: employee_team });
        break;
      default:
        res.json({ success: true, response: "NO ROUTES INCLUDE", url: req.url });
        break;
    }
  } catch (error) {
    res.json({ error: error }); 
  }
});

app.post('/teams', async function(req, res) {
  const employee = {
    "sub" : "d0229811-67cc-4fb8-915b-38d8029b85df",
    "department": "TEAM FAST",
    "immediate_head": {
      "sub" : "d0229811-67cc-4fb8-915b-38d8029b85df",
      "name" : "Dennis Penaredondo",
      "picture" : "https://m.media-amazon.com/images/M/MV5BZjI1MTU2NGItYTY3Yi00Y2U2LTk0N2ItNTBhNmY0ZWZlZmExXkEyXkFqcGdeQXVyNjMwMzc3MjE@._V1_QL75_UX500_CR0,0,500,281_.jpg"
    },
    "client": "Non-Blooms"
  }
  try {
    const team = await teamModel.create(employee)
    res.status(200).json({ success: true, response: team})
  } catch (error) {
    res.json({ error: error }); 
  }
});

app.put('/teams', async function(req, res) {
  try {
    const {sub, department, immediate_head, client} = req.body
    const team = await teamModel.updateOne({sub: sub}, {department: department, immediate_head: immediate_head, client: client})
    res.status(200).json({ success: true, response: team})
  } catch (error) {
    res.json({ error: error });
  }
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});


app.delete('/teams', async function(req, res) {
  try {
    const {sub} = req.body
    const team = await teamModel.deleteOne({sub: sub})
  } catch (error) {
    res.json({ error: error });
  }
});

app.listen(3000, function() {
    console.log("App started")
});

module.exports = app
