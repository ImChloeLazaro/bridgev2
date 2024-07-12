const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const mongoose = require('mongoose')
const taskModel = require('/opt/schema/cmsTaskSchema.js')
const limiter = require('/opt/helpers/limiter.js')
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

app.get('/cms/task', async function (req, res) {
  try {
    const read = await taskModel.find();

    // Helper function to remove duplicates based on 'sub'
    const removeDuplicates = (arr, key) => {
      const seen = new Set();
      return arr.filter(item => {
        const k = item[key];
        return seen.has(k) ? false : seen.add(k);
      });
    };

    // Assuming read is an array, you might need to map through it
    const data = read.map(task => {
      return {
        ...task._doc,  // _doc is used to access the actual data object in Mongoose documents
        processor: removeDuplicates(task.processor, 'sub'),
        reviewer: removeDuplicates(task.reviewer, 'sub')
      };
    });

    res.status(200).json({ success: true, response: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    const { _id, reviewer, processor, sla_id } = req.body
    const proxy = req.path;
    switch (proxy) {
      case '/cms/task/update-processor':
        await taskModel.updateOne({ _id }, { $push: { processor: { $each: processor } } })
        res.status(200).json({ success: true, message: "Processor Added Successfully" })
        break;
      case '/cms/task/update-reviewer':
        await taskModel.updateOne({ _id }, { $push: { reviewer: { $each: reviewer } } })
        res.status(200).json({ success: true, message: "Reviewer Added Successfully" })
        break;
      case '/cms/task/remove-processor':
        await taskModel.updateOne({ _id }, { $pull: { processor: { _id: { $in: processor.map(processor => processor._id) } } } });
        res.status(200).json({ success: true, message: "Processor Removed Successfully" });
        break;
      case '/cms/task/remove-reviewer':
        await taskModel.updateOne({ _id }, { $pull: { reviewer: { _id: { $in: reviewer.map(reviewer => reviewer._id) } } } });
        res.status(200).json({ success: true, response: 'Remove Reviewer Successfully' })
        break;
      case '/cms/task/remove-sla':
        await taskModel.updateOne({ _id }, { $pull: { sla: { _id: sla_id } } });
        res.status(200).json({ success: true, message: 'SLA updated successfully' });
        break;
      default:
        res.status(200).json({ success: true, response: "NO ROUTES INCLUDE" });
        break;
    }
  } catch (error) {
    res.json({ error: error })
  } f
});

app.delete('/cms/task', async function (req, res) {
  try {
    const { _id } = req.query
    const destroy = await taskModel.deleteOne({ _id: _id })
    res.status(200).json({ success: true, body: destroy, message: "Task deleted successfully" })
  } catch (error) {
    res.json({ error: error })
  }
});

app.listen(3000, function () {
  console.log("App started")
});

module.exports = app
