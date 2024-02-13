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

const taggedUserSchema = mongoose.Schema({
  sub: String,
  name: String,
  email: String,
});

const postSchema = mongoose.Schema({
  sub: String,
  title: String,
  type: String,
  caption: String,
  media: String,
  tagged_user: [taggedUserSchema],
  createdBy: {
    type: Date,
    default: Date.now(),
  },
});

const postModel = mongoose.model("post", postSchema);

app.get("/post", async function (req, res) {
  try {
    const posts = await postModel.find().sort({ createdBy: -1 });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    throw error;
  }
});

app.post("/post", async function (req, res) {
  // try {
  //   const insert = await postModel.create(post);
  //   if (!insert) {
  //     res.status(500).json({ success: false, data: "UNKNOWN ERROR OCCURED!" });
  //   }
  //   res.status(200).json({ success: true, data: insert });
  // } catch (error) {
  //   throw error;
  // }
  res.status(200).json({ success: true, data: req.body });
});

app.put("/post", async function (req, res) {
  res.status(200).json({ success: true, data: req.body });
});

app.delete("/post", async function (req, res) {
  const _id = "65bc17464ac83410431b0c26";
  try {
    const deletePost = await postModel.deleteOne({ _id });
    res.status(200).json({ success: true, data: deletePost });
  } catch (error) {
    throw error;
  }
});

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;
