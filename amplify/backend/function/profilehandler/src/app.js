const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const mongoose = require("mongoose");
const profileModel = require("/opt/schema/profileSchema.js");
const recruitmentModel = require("/opt/schema/recruitmentSchema.js");
const leaveModel = require("/opt/schema/leaveSchema.js");
const benefitModel = require("/opt/schema/benefitSchema.js");
const limiter = require("/opt/helpers/limiter.js");

const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(limiter);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
mongoose.connect(process.env.DATABASE);

app.get("/profile", function (req, res) {
  res.json({ success: "get call succeed!", url: req.url });
});

app.post("/profile", async function (req, res) {
  try {
    const { application, background, contact, employment, sub } = req.body;
    const existingProfile = await profileModel.findOne({ "profile.sub": sub });
    let profile;
    if (existingProfile) {
      // Update the existing profile
      existingProfile.profile.application = application;
      existingProfile.profile.background = background;
      existingProfile.profile.contact = contact;
      existingProfile.profile.employment = employment;
      profile = await existingProfile.save();
    } else {
      // Create a new profile
      profile = await profileModel.create({
        profile: {
          application,
          background,
          contact,
          employment,
          sub,
        },
      });
    }
    res.status(200).json({ result: profile });
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: error });
  }
});
app.get("/profile/*", async function (req, res) {
  try {
    const sub = req.query.sub; // Extract sub from query parameters
    const key = req.path; // Use req.path to get the URL path

    switch (key) {
      case "/profile/information":
        //profile
        const data = await profileModel.findOne({ "profile.sub": sub });
        const profile = data.profile.application.employee_information;
        const profileData = {
          address: profile.permanent_address,
          birthday: profile.birthdate,
          contact: profile.mobile_number,
          emergency: data.profile.contact.emergency_contact,
        };
        //recruitment
        const recruitment = await recruitmentModel.findOne({ sub });
        //leave
        const balance = await leaveModel.findOne({ sub });
        //benefits
        const benefits = await benefitModel.findOne({ sub });
        //onBoarding
        const self_data = await profileModel.findOne({ "profile.sub": sub });
        res.status(200).json({
          success: true,
          response: { profileData, recruitment, balance, benefits, self_data },
        });
        break;
      // case "/profile/self_data":
      //   const self_data = await profileModel.findOne({ "profile.sub": sub });
      //   res.status(200).json({ success: true, response: self_data });
      //   break;
      default:
        res
          .status(200)
          .json({ success: true, response: "NO ROUTES INCLUDE", url: req.url });
        break;
    }
  } catch (error) {
    res.json({ error: error });
  }
});

app.put("/profile", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.delete("/profile", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/profile/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;
