const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const mongoose = require("mongoose");
const limiter = require("/opt/helpers/limiter.js");
const SubTeamModel = require("/opt/schema/subTeamSchema.js");
const taskModel = require("/opt/schema/cmsTaskSchema.js");
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

app.get("/teams/subteam", async function (req, res) {
  res.json({ success: "get call for sub-team!", url: req.url });
});

app.get("/teams/subteam/*", async function (req, res) {
  const proxy = req.path;
  const { sub } = req.query;

  switch (proxy) {
    case "/teams/subteam/mySubTeam":
      try {
        const getSubTeam = await SubTeamModel.find({
          "tl.sub": sub,
        });
        res.json({ success: true, response: getSubTeam });
      } catch (error) {
        res.json({ error: error });
      }
      break;
    case "/teams/subteam/myUserSubTeam":
      try {
        const getUserSubTeam = await SubTeamModel.find({
          $or: [
            { "members.sub": sub },
            { "tl.sub": sub },
            { "heads.sub": sub },
          ],
        });
        res.json({ success: true, response: getUserSubTeam });
      } catch (error) {
        res.json({ error: error });
      }
      break;
    default:
      res.json({ success: "get call for sub-team!", url: req.url, sub: sub });
      break;
  }
});

app.post("/teams/subteam", async function (req, res) {
  try {
    const newSubTeam = await SubTeamModel.create(req.body);
    res.json({ success: true, response: newSubTeam });
  } catch (error) {
    res.json({ error: error });
  }
});

app.put("/teams/subteam/*", async function (req, res) {
  try {
    const { sub } = req.query;
    const proxy = req.path;
    const { _id, name, tl, heads, members, clients, status } = req.body;
    switch (proxy) {
      case "/teams/subteam/activeOrArchive":
        const team = await SubTeamModel.updateOne({ _id }, { status });
        const tasksUpdateResult = await taskModel.updateMany({ team: _id }, { status });
        res.json({
          success: true,
          response: team,
          task: tasksUpdateResult,
        });
        break;
      case "/teams/subteam/update":
        const updatedTeam = await SubTeamModel.updateOne(
          { _id },
          { name, heads, members, clients }
        );
        res.json({ success: true, response: updatedTeam });
        break;
      default:
        res.json({ success: "put call for sub-team!", url: req.url, sub: sub });
        break;
    }
  } catch (error) {
    res.json({ error: error });
  }
});

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;
