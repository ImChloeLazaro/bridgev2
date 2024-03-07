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

const recruitmentSchema = mongoose.Schema({
  sub: String,
  employee_number: Number,
  hiredate: String,
  is_active: Boolean,
  status: String,
  position: String,
})

const recruitmentModel = mongoose.model('recruitment', recruitmentSchema)

app.get('/recruitment', async function(req, res) {
  try {
    const recruitment = await recruitmentModel.find()
    res.json({success: true, response: recruitment})
  } catch (error) {
    res.status(500).json({error: error})
  }
});

app.get('/recruitment/*', async function(req, res) {
  try {
    const sub = req.query.sub; // Extract sub from query parameters
    const key = req.path; // Use req.path to get the URL path

    switch (key) {
      case '/recruitment/information':
        const recruitment = await recruitmentModel.findOne({sub})
          res.json({success: true, response: recruitment})
        break;
      default:
        res.status(200).json({ success: true, response: "NO ROUTES INCLUDE", url: req.url });
        break;
    }
  } catch (error) {
    res.json({ error: error });
  }
});

app.post('/recruitment', async function(req, res) {
  try {
    const { sub, employee_number, hiredate, is_active, status, position } = req.body
    const recruitment = await recruitmentModel.create({ sub, employee_number, hiredate, is_active, status, position })
    res.json({success: 'post call succeed!', url: req.url, response: recruitment})
  } catch (error) {
    res.status(500).json({error: error})
  }
});

app.put('/recruitment', async function(req, res) {
  try {
    const { sub, employee_number, hiredate, is_active, status, position } = req.body
    const recruitment = await recruitmentModel.updateOne({sub}, { employee_number, hiredate, is_active, status, position })
    res.json({success: true, response: recruitment})
  } catch (error) {
    res.status(500).json({error: error})
  }
});

app.delete('/recruitment', async function(req, res) {
  try {
    const { sub } = req.query
    const recruitment = await recruitmentModel.deleteOne({sub})
    res.json({success: true, response: recruitment})
  } catch (error) {
    res.status(500).json({error: error})
  }
});

app.listen(3000, function() {
    console.log("App started")
});

module.exports = app
