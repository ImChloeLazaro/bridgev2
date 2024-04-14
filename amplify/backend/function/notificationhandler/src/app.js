const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const mongoose = require("mongoose")
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(cors({
  origin: 'http://localhost:3000'
}))
// Create an object to store the session data
const session = {}

// Create an HTTP server instance using express
const server = http.createServer(app);

// Initialize socket.io with the created HTTP server
const io = new Server(server, {
  cors: {
    origin: '*',
  }
})

io.use((socket, next) => { // Middleware to handle the session
  //save session data
  session[socket.id] = {
    createdAt: new Date(),
  }
  return next();
});

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

mongoose.connect(process.env.DATABASE)

const notificationSchema = mongoose.Schema({
  sub: String,
  title: String,
  type: [String],
  description: String,
  unread: { type: Boolean, default: false }, // read or unread
  hidden: { type: Boolean, default: false }, //hide or unhide
  notified_from: {
    sub: String,
    name: String,
    email: String,
    picture: String,
  },
  createdBy: {
    type: Date,
    default: Date.now()
  }
})

const notificationModel = mongoose.model('notification', notificationSchema)

/*
* Socket Connection
* ? Connection
*/

io.on('connection', (socket) => {
  console.log('A user connected ' + socket.id);
  io.to(socket.id).emit('user', 'Welcome to the chat room! User ID: ' + socket.id) // Send a welcome message to the connected user

  io.to(socket.id).emit('user',
    'Welcome to the chat room! User ID: ' + socket.id
  ) // Send a welcome message to the connected user

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    //delete session data
    delete session[socket.id];
  });
})

app.get('/notification', async function (req, res) {
  try {
    const notifications = await notificationModel.find()
    res.status(200).json({ success: true, response: notifications })
  } catch (error) {
    res.json(error)
  }
});

app.get('/notification/*', async function (req, res) {
  try {
    const proxy = req.path;
    const { sub } = req.body
    switch (proxy) {
      case '/notification/sub':
        const notifications = await notificationModel.findOne({ sub })
        res.status(200).json({ success: true, response: notifications });
        break;
      default:
        res.status(200).json({ success: true, response: "NO ROUTES INCLUDE" });
        break;
    }
  } catch (error) {
    res.json(error)
  }
});

app.post('/notification', async function (req, res) {
  try {
    const { sub, title, type, description, notified_from } = req.body
    const notification = await notificationModel.create({ sub, title, type, description, notified_from })
    res.status(200).json({ success: true, response: notification })
  } catch (error) {
    res.json(error)
  }
});

app.put('/notification', async function (req, res) {
  try {
    const { sub, title, type, description, notified_from } = req.body
    const notification = await notificationModel.updateOne({ _id }, { sub, title, type, description, notified_from })
    res.status(200).json({ success: true, response: notification })
  } catch (error) {
    res.json(error)
  }
});

app.put('/notification/*', async function (req, res) {
  try {
    const proxy = req.path;
    const { _id, unread, hidden } = req.body
    switch (proxy) {
      case '/notification/markasread':
        const markAsRead = await notification({ _id }, { unread })
        res.status(200).json({ success: true, response: markAsRead });
        break;
      case '/notification/hideorunhide':
        const hideOrUnhide = await notification({ _id }, { hidden })
        res.status(200).json({ success: true, response: hideOrUnhide });
        break;
      default:
        res.status(200).json({ success: true, response: "NO ROUTES INCLUDE" });
        break;
    }
  } catch (error) {
    res.json(error)
  }
});


app.delete('/notification', async function (req, res) {
  try {
    const { _id } = req.body
    const notification = await notificationModel.deleteOne({ _id })
    res.status(200).json({ success: true, response: notification })
  } catch (error) {
    res.json(error)
  }
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
