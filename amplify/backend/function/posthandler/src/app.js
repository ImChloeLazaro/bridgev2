const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

mongoose.connect(process.env.DATABASE);

const postSchema = mongoose.Schema({
  caption : String,
  comments : Number ,
  datetimePublished : Date,
  datetimeScheduled : Date,
  id : Number,
  key : String,
  media : [String],
  mediaLayout: String,
  orientation: String,
  postKey : String,
  publisher : String,
  publisherPicture: String,
  reacted : Boolean ,
  reactionList : [String],
  reactions : { 
    star: Number, 
    love: Number, 
    birthday: Number, 
    happy: Number
  },
  status: String,
  taggedPeople: [{
          sub: String,
          name:String,
          picture:String,
  }],
  team: String,
  title : String,
  type : String,
});

const postModel = mongoose.model("post", postSchema);

app.get("/post", async function (req, res) {
  try {
    const posts = await postModel.find().sort({ createdBy: -1 });
    res.status(200).json({ success: true, response: posts });
  } catch (error) {
    throw error;
  }
});

app.post("/post", async function (req, res) {
  try {
    const posts = req.body;
    const insert = await postModel.create(posts);
    res.status(200).json({ success: true, response: posts });
  } catch (error) {
    res.status(500).json({ success: false, response: error });
  }
});

app.put("/post", async function (req, res) {
  res.status(200).json({ success: true, response: req.body });
});

app.delete("/post", async function (req, res) {
  try {
    const { _id } = req.body;
    const deletePost = await postModel.deleteOne({ _id });
    res.status(200).json({ success: true, response: deletePost });
  } catch (error) {
    throw error;
  }
});

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;
