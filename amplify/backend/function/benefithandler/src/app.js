const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const mongoose = require("mongoose");
const benefitModel = require("/opt/schema/benefitSchema.js");
const limiter = require("/opt/helpers/limiter.js");
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
app.use(limiter);
mongoose.connect(process.env.DATABASE);

app.get("/benefits", async function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

app.get("/benefits/*", async function (req, res) {
  const { sub } = req.query;
  try {
    const benefits = await benefitModel.findOne({ sub });
    res.json({ success: true, response: benefits });
  } catch (error) {
    res.json({ error: error });
  }
});

app.post("/benefits", async function (req, res) {
  try {
    const { sub } = req.body;
    const insert = await benefitModel.create({ sub });
    res.json({ success: true, response: insert });
  } catch (error) {
    res.json({ error: error });
  }
});

app.put("/benefits", async function (req, res) {
  const { sub, newbenefit } = req.body;
  const benefit = await benefitModel.updateOne(
    { sub },
    { $push: { benefits: newbenefit } },
    { new: false }
  );
  res.json({ success: true, response: benefit });
});

app.put("/benefits/*", function (req, res) {
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.delete("/benefits", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});
90;
module.exports = app;
