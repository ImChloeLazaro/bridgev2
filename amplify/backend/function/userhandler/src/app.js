const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const mongoose = require("mongoose");
// const limiter = require('/opt/helpers/limiter.js')
const profileModel = require("/opt/schema/profileSchema.js");
const recruitmentModel = require("/opt/schema/recruitmentSchema.js");
const leaveModel = require("/opt/schema/leaveSchema.js");
const benefitModel = require("/opt/schema/benefitSchema.js");
const { rateLimit } = require("express-rate-limit");
// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 2000,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(limiter);

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

mongoose.connect(process.env.DATABASE);

const roleSchema = mongoose.Schema({
  name: String,
  permissions: [String],
});

const userSchema = mongoose.Schema({
  sub: String,
  email: String,
  name: String,
  picture: String,
  hasOnboardingData: {
    type: Boolean,
    default: false,
  },
  role: {
    type: [roleSchema],
    default: [
      {
        name: "USER",
        permissions: ["processor"],
      },
    ],
  },
  createdBy: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("User", userSchema);
app.get("/user", async function (req, res) {
  try {
    const { sub } = req.query;
    if (typeof sub !== "string") {
      return res.status(400).json({ error: "Invalid sub parameter" });
    }
    const read = await userModel.findOne({ sub: { $eq: sub } });
    if (!read) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ success: "GET RESULT", result: read });
  } catch (error) {
    console.error("Error while processing GET request for user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/user/*", async function (req, res) {
  try {
    const proxy = req.path; // Use req.path to get the URL path

    switch (proxy) {
      case "/user/tagged":
        const data = await userModel.find();
        res.status(200).json({ success: true, result: data });
        break;
      default:
        res
          .status(200)
          .json({ success: true, response: "NO ROUTES INCLUDE", url: req.url });
        break;
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post("/user", async function (req, res) {
  const {
    sub,
    name,
    picture,
    email,
    application,
    background,
    contact,
    employment,
  } = req.body;
  try {
    if (!sub) {
      return res.status(400).json({
        success: false,
        message: "The 'sub' field is required",
      });
    }
    const getuserbysub = await userModel.findOne({ sub: { $eq: sub } });
    if (!getuserbysub) {
      const insert = new userModel({
        sub,
        name,
        picture,
        email,
      });

      const profile = new profileModel({
        profile: {
          application,
          background,
          contact,
          employment,
          sub,
        },
      });
      const leave = new leaveModel({
        sub,
      });
      const benefit = new benefitModel({
        sub,
      });
      await profile.save();
      await insert.save();
      await leave.save();
      await benefit.save();
      res.status(200).json({
        success: "NEW USER DETECTED! INITIAL DATA INSERT SUCCESS",
        result: insert,
      });
    } else {
      res.status(204).json({ success: "DATA FETCHED", result: getuserbysub });
    }
  } catch (error) {
    res.status(500).json({
      success: "NEW USER DETECTED! INITIAL DATA INSERT FAILED",
      error: error,
    });
  }
});

app.put("/user", async function (req, res) {
  const { sub } = req.query;

  if (typeof sub !== "string") {
    return res.status(400).json({ error: "Invalid sub parameter" });
  }
  try {
    const updateonboarding = await userModel.updateOne(
      {
        sub: { $eq: sub },
      },
      {
        hasOnboardingData: true,
      }
    );
    res
      .status(200)
      .json({ success: "UPDATE SUCCESS!", result: updateonboarding });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
app.put("/user/*", async function (req, res) {
  try {
    const { sub, role } = req.body; // Extract sub from query parameters
    const proxy = req.path; // Use req.path to get the URL path

    switch (proxy) {
      case "/user/update-role":
        const data = await userModel.findOneAndUpdate(
          { sub: { $eq: sub } },
          { role: role },
          { new: true }
        );
        res.status(200).json({ success: true, response: data });
        break;
      default:
        res
          .status(200)
          .json({ success: true, response: "NO ROUTES INCLUDE", url: req.url });
        break;
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
app.delete("/user", async function (req, res) {
  res.json({ success: "USER HANDLER DELETE API ROUTE!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;
