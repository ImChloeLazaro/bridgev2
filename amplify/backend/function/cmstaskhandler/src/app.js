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
  "sla" : [
		{
	  	"name" : String,
	  	"status" : String, //todo, pending, to review, done
			"progress" : String //Good, Overdue, Adhoc
		}
	]
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
    // const { client, processor, reviewer, duration, sla } = req.body
    const client = {
      "client": {
        "client_id": "client-123",
        "name": "BLOOMS UMINA",
        "email": "blooms.umina@blooms.com.au",
        "picture": "https://www.fluvouchers.com.au/logos/profile/limage-4224.jpg"
      },
      "duration": {
        "start": "2024-02-16T02:21:48.455Z",
        "end": "2024-03-16T02:21:48.455Z"
      },
      "processor": [
        {
          "sub": "d0229811-67cc-4fb8-915b-38d8029b85df",
          "name": "Chloe Lazaro",
          "email": "chloe.lazaro@aretex.com.au",
          "picture": "https://lh3.googleusercontent.com/a/ACg8ocIxaddCAyXN_wh9WLB3DrR4tqUJOMWc31qXCUmmCtrLaA=s96-c",
          "_id": "65dbe8aea9d595dfef10fa1f"
        },
        {
          "sub": "a8dfd442-2977-499b-a917-a0e226c6c089",
          "name": "Cyrus Layugan",
          "email": "cyrus.layugan@aretex.com.au",
          "picture": "https://lh3.googleusercontent.com/a/ACg8ocLpwxhx9lINMohpX7A8ewFwV4G9dKZ_oB2TK42jxweJ=s96-c",
          "_id": "65dbe8aea9d595dfef10fa20"
        }
      ],
      "reviewer": [
        {
          "sub": "1857671a-fad8-4dcb-b7ae-171be5845fe5",
          "name": "Reinier Silo",
          "email": "reinier.silo@aretex.com.au",
          "picture": "https://lh3.googleusercontent.com/a/ACg8ocJUEKZAPNJj_fRKTTZHj5G0ucsGyD4Zo2OJLhCs6mPSOyM=s96-c",
          "_id": "65dbe8aea9d595dfef10fa21"
        }
      ],
      "sla" : [
        {
            "name" : "Dailies Review",
            "status" : "Good",
          "progress" : "pending"
        }
          
      ]    
    }
    const insert = await taskModel.create(client)
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
