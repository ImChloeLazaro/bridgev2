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
  index: String,
  manager: {
    sub: String,
    name: String,
    email: String,
    picture: String
  },
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
      picture: String,
      privilege: String //viewer, editor
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
  sla: [{
    name: String,
    instruction: String,
    status: String, //todo, pending, to review, done
    progress: String, //Good, Overdue, Adhoc
    duration: {
      start: Date,
      end: Date,
      recurrence: String, //Daily, Weekly, Monthly, Quarterly, Yearly
    },
    done_by: {
      sub: String,
      name: String,
      email: String,
      picture: String
    } //sub 
  }]
})

const taskModel = mongoose.model('Task', taskSchema)

app.get('/cms/task', async function (req, res) {
  try {
    const read = await taskModel.find()
    res.status(200).json({ success: true, response: read })
  } catch (error) {
    res.json({ error: error })
  }
});

app.get('/cms/task/*', async function (req, res) {
  try {
    const proxy = req.path; // Use req.path to get the URL path
    const { processor, reviewer } = req.query
    switch (proxy) {
      case '/cms/task/sla':
        const sla = await taskModel.find({
          $or: [
            { "processor.sub": processor },
            { "reviewer.sub": reviewer }
          ]
        })
        res.status(200).json({ success: true, response: sla })
        break;
      case '/cms/task/processor':
        res.status(200).json({ success: true, response: 'reassign processor' })
        break;
      default:
        res.status(200).json({ success: true, response: "NO ROUTES INCLUDE" });
        break;
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

app.post('/cms/task', async function (req, res) {
  try {
    const { index, manager, client, processor, reviewer, duration, sla } = req.body
    const insert = await taskModel.create({ manager, client, processor, reviewer, duration, sla })
    res.status(200).json({ success: true, response: insert, message: "Task created successfully" })
  } catch (error) {
    res.json({ error: error })
  }
});

app.put('/cms/task/', async function (req, res) {
  try {
    const { _id, index, name, client, processor, reviewer, duration, sla } = req.body
    const update = await taskModel.updateOne({ _id }, { _id, index, name, client, processor, reviewer, duration, sla })
          res.status(200).json({ success: true, response: update, message: "Task Updated successfully" })
  } catch (error) {
    res.json({ error: error })
  }
});

app.put('/cms/task/*', async function (req, res) {
  try {
    const { _id, reviewer, processor } = req.body 
    const proxy = req.path;
    switch (proxy) {
        case '/cms/task/update-processor':
          await taskModel.updateOne({ _id },{ $push: { processor : {$each: processor}}})
          res.status(200).json({ success: true,  message: "Processor Added Successfully" })
        break;
        case '/cms/task/update-reviewer':
          await taskModel.updateOne({ _id },{ $push: { reviewer : {$each: reviewer}}})
          res.status(200).json({ success: true,  message: "Reviewer Added Successfully" })
        break;
        case '/cms/task/remove-processor':
          await taskModel.updateOne({ _id }, { $pull: { processor: { _id: { $in: processor.map(processor => processor._id) } } } });
          res.status(200).json({ success: true, message: "Processor Removed Successfully" });
        break;
        case '/cms/task/remove-reviewer':
          await taskModel.updateOne({ _id }, { $pull: { reviewer: { _id: { $in: reviewer.map(reviewer => reviewer._id) } } } });
          res.status(200).json({ success: true, response: 'Remove Reviewer Successfully' })
          break;
      default:
        res.status(200).json({ success: true, response: "NO ROUTES INCLUDE" });
        break;
    }
  } catch (error) {
    res.json({ error: error })
  }
});

app.delete('/cms/task', async function (req, res) {
  try {
    const { _id } = req.body
    const destroy = await taskModel.deleteOne({ _id  })
    res.status(200).json({ success: true, body: destroy, message: "Task deleted successfully" })
  } catch (error) {
    res.json({ error: error })
  }
});

app.listen(3000, function () {
  console.log("App started")
});

module.exports = app
