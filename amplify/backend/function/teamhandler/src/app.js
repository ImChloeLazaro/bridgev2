const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const mongoose = require("mongoose")
const teamModel = require('/opt/schema/teamSchema.js')
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

mongoose.connect(process.env.DATABASE)

app.get('/teams/team', async function (req, res) {
  try {
    const team = await teamModel.find()
    res.status(200).json({ success: true, response: team })
  } catch (error) {
    res.json({ error: error });
  }
});

app.get('/teams/team/*', async function (req, res) {
  try {
    const { sub } = req.query; // Extract sub from query parameters
    const key = req.path; // Use req.path to get the URL path
    switch (key) {
      case '/teams/team/employee':
        const employee_team = await teamModel.findOne({ sub: sub })
        res.json({ success: true, route: "EMPLOYEE TEAM ROUTE", response: employee_team });
        break;
      case '/teams/team/myTeam':
        const my_team = await teamModel.find({
          $or: [
            { "heads.sub": sub },
            { "members.sub": sub }
          ]
        })
        res.json({ success: true, route: "MY TEAM ROUTE", response: my_team });
        break;
      case '/teams/team/filterClient':
        const filter_client = await teamModel.find({ "heads.sub": sub });
        const clients = filter_client.flatMap(team =>
          team.client.map(client => ({
            key: client._id,
            _id: client._id,
            name: client.name,
            email: client.email
          }))
        );
        // Filter out duplicate clients based on _id
        const uniqueClients = clients.filter((client, index, self) =>
          index === self.findIndex((c) => c._id === client._id)
        );
        res.json({ success: true, response: uniqueClients });
        break;
      case '/teams/team/filterTeam':
        const filter_team = await teamModel.find({ "heads.sub": sub });
        const people = filter_team.flatMap(team =>
          team.members.map(member => ({
            key: member.sub,
            _id: member._id,
            name: member.name,
            email: member.email,
            picture: member.picture
          }))
        );
        // Ensure unique members by _id
        const filteredPeople = people.filter((person, index, self) =>
          index === self.findIndex((p) => p.key === person.key)
        );

        res.json({ success: true, response: filteredPeople });
        break;
      default:
        res.json({ success: true, response: "NO ROUTES INCLUDE", url: req.url });
        break;
    }
  } catch (error) {
    res.json({ error: error });
  }
});

app.post('/teams/team', async function (req, res) {
  const { name, heads, members, client } = req.body
  try {
    if (!name || !client || !heads || !members) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const team = await teamModel.create(req.body)
    res.status(200).json({ success: true, response: team, body: req.body })
  } catch (error) {
    res.json({ error: error });
  }
});

app.put('/teams/team/*', async function (req, res) {
  try {
    const { status, _id } = req.body;
    const key = req.path;

    switch (key) {
      case '/teams/team/activeOrArchive':
        const team = await teamModel.updateOne({ _id }, { status })
        res.json({ success: true, response: team });
        break;
      case '/teams/team/updateMember':
        const teamOne = await teamModel.updateOne(
          { _id: _id, "members._id": status._id },
          {
            $set: {
              "members.$.employment_status": status.employment_status,
              "members.$.position": status.position,
              "members.$.status": status.status
            }
          }
        );
        res.json({ success: true, response: teamOne, status: status });
        break;
      default:
        res.json({ success: true, response: "NO ROUTES INCLUDE", url: req.url });
        break;
    }
  } catch (error) {
    res.json({ error: error });
  }
})
app.put('/teams/team', async function (req, res) {
  try {
    const { _id, name, heads, members, client } = req.body
    const team = await teamModel.updateOne({ _id }, {
      name,
      heads,
      members,
      client
    })
    res.status(200).json({ success: true, response: team })
  } catch (error) {
    res.json({ error: error });
  }
});


app.delete('/teams/team', async function (req, res) {
  try {
    const { sub } = req.body
    const team = await teamModel.deleteOne({ sub: sub })
  } catch (error) {
    res.json({ error: error });
  }
});

app.listen(3000, function () {
  console.log("App started")
});

module.exports = app
