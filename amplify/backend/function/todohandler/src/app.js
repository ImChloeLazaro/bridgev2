const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const mongoose = require('mongoose');
const todoModel = require('/opt/schema/todoSchema.js');
const limiter = require('/opt/helpers/limiter.js');
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

mongoose.connect(process.env.DATABASE);

app.get('/todo', async function (req, res) {
  try {
    const todos = await todoModel.find();
    res.json({ success: true, response: todos });
  } catch (error) {
    res.json({ error: error });
  }
});

app.get('/todo/*', async function (req, res) {
  try {
    const { sub } = req.query;
    const proxy = req.path;
    switch (proxy) {
      case '/todo/employee':
        const todos = await todoModel.find({ sub: sub });
        res.json({ success: true, response: todos });
        break;
      default:
        res.json({ success: true, response: "NO ROUTES INCLUDE", url: req.url });
        break;
    }
  } catch (error) {
    res.json({ error: error });
  }
});

app.post('/todo', async function (req, res) {
  try {
    const { sub, title } = req.body;
    const todo = await todoModel.create({ sub: sub, title: title });
    res.json({ success: true, response: todo });
  } catch (error) {
    res.json({ error: error });
  }
});

app.put('/todo', async function (req, res) {
  try {
    const { _id, status } = req.body;
    const todo = await todoModel.updateOne({ _id },{ status: status });
    res.json({ success: true, response: todo });
  } catch (error) {
    res.json({ error: error });
  }
});

app.delete('/todo', async function (req, res) {
  try {
    const { _id } = req.body;
    const todo = await todoModel.deleteOne({ _id });
    res.json({ success: true, response: todo });
  } catch (error) {
    res.json({ error: error });
  }
});

app.listen(3000, function () {
  console.log("App started")
});

module.exports = app
