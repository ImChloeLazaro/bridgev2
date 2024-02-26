const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const mongoose = require('mongoose')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

mongoose.connect(process.env.DATABASE);

const taskSchema = mongoose.Schema({
  name: String,
  client: {
    client_id: String,
    name: String,
    email: String,
    picture: String
  },
  processor: [
    {
      sub: String,
      name: String,
      email: String,
      picture: String
    }
  ],
  reviewer: [
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

const taskModel = mongoose.model('Task', taskSchema)

app.get('/cms/task', async function (req, res) {
  try {
    const read = await taskModel.find()
    res.status(200).json({ success: true, body: read })
  } catch (error) {
    res.json({ error: error })
  }
});

app.get('/cms/task/*', async function (req, res) {
  try {
    const { _id } = req.query
    const read = await taskModel.findOne({ _id })
    res.status(200).json({ success: true, body: read })
  } catch (error) {
    res.json({ error: error })
  }
});

app.post('/cms/task', async function (req, res) {
  try {
    const { name, client, processor, reviewer, duration, status } = req.body
    const insert = await taskModel.create({
      name,
      client,
      processor,
      reviewer,
      duration,
      status
    })
    res.status(200).json({ success: true, body: insert, message: "Task created successfully"})

  } catch (error) {
  res.json({ error: error })
}
});


app.put('/cms/task', async function (req, res) {
  try {
    const { _id, name, client, processor, reviewer, duration, status } = req.body
    const update = await taskModel.updateOne({ _id }, {
      name,
      client,
      processor,
      reviewer,
      duration,
      status
    })
    res.status(200).json({ success: true, body: update, message: "Task updated successfully" })
  } catch (error) {
    res.json({ error: error })
  }
});

app.delete('/cms/task', async function (req, res) {
  try {
    const { _id } = req.body
    const destroy = await taskModel.deleteOne({ _id })
    res.status(200).json({ success: true, body: destroy, message: "Task deleted successfully" })
  } catch (error) {
    res.json({ error: error })
  }
});

app.listen(3000, function () {
  console.log("App started")
});

module.exports = app
