const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const mongoose = require("mongoose");
// declare a new express app
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

const shortcutSchema = mongoose.Schema({
  sub: String,
  title: String,
  url: String,
  createdBy: {
    type: Date,
    default: Date.now(),
  },
});

const shortcutModel = mongoose.model("shortcut", shortcutSchema);

app.get("/shortcut", async function (req, res) {
  const query = req.query;
  try {
    const shortcutQuery = await shortcutModel.find({
      sub: query.sub,
    });
    res.status(200).json({ response: shortcutQuery });
  } catch (error) {
    throw error;
  }
});

app.post("/shortcut", async function (req, res) {
  const { sub, title, url } = req.body;

  try {
    const shortcutQuery = await shortcutModel.create({
      sub,
      title,
      url,
    });
    res.status(200).json({
      message: "POST SUCCESS",
      response: shortcutQuery,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

app.put("/shortcut", async function (req, res) {
  const { _id, title, url } = req.body;
  try {
    const updateShortcut = await shortcutModel.updateOne(
      { _id: _id },
      { title: title, url: url }
    );
    res.json({ success: true, response: updateShortcut });
  } catch (error) {
    throw error;
  }
});

app.delete("/shortcut", async function (req, res) {
  const { _id } = req.query;
  try {
    const deleteshortcut = await shortcutModel.deleteOne({ _id: _id });
    res.json({ success: true, response: deleteshortcut });
  } catch (error) {
    throw error;
  }
});

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;
