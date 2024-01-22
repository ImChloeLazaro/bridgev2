const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const mongoose = require("mongoose")
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

mongoose.connect(process.env.DATABASE)

const childrenSchema = mongoose.Schema({
  "name": String,
  "age": String,
  "civilStatus": String,
  "occupation": String,
  "company": String
})

const educationSchema = mongoose.Schema({
  "highSchool": {
    "name": String,
    "address": String,
    "dateOfAttendance": String,
    "major": String
  },
  "college": {
    "name": String,
    "address": String,
    "dateOfAttendance": String,
    "major": String
  },
  "postGraduate": {
    "name": String,
    "address": String,
    "dateOfAttendance": String,
    "major": String
  },
  "specialCourses": {
    "name": String,
    "address": String,
    "dateOfAttendance": String,
    "major": String
  }
})

const examinationSchema = mongoose.Schema({
  "association": String,
  "dateTaken": String,
  "certification": String
})

const employmentHistorySchema = mongoose.Schema({
  "positionHeld": String,
  "duration": String,
  "dateOfAttendance": String,
  "reasonForLeaving": String
})

const trainingSchema = mongoose.Schema({
  "specialization": String,
  "provider": String,
  "programName": String,
  "duration": String
})

const referenceSchema = mongoose.Schema({
  "name": String,
  "positionHeld": String,
  "company": String,
  "contact": String
})

const emergencyContactSchema = mongoose.Schema({
  "name": String,
  "address": String,
  "relationship": String,
  "contact": String,
})

const employeeSchema = mongoose.Schema({
  "firstname": String,
  "middlenane": String,
  "lastname": String,
  "vacancyThru": String,
  "referredBy": String,
  "dateofApplication": String,
  "dateofAvailability": String,
  "appliedFor": String,
  "salary": String,
  "presentAddress": String,
  "permanentAddress": String,
  "residenceStatus": String,
  "gender": String,
  "birdate": String,
  "civilStatus": String,
  "age": String,
  "emailAddress": String,
  "birthplace": String,
  "homePhoneNumber": String,
  "taxIdentificationNumber": String,
  "socialSecurityNumber": String,
  "pagibigNumber": String,
  "philhealthNumber": String,
  "fathersName": String,
  "fathersAge": String,
  "fathersOccupation": String,
  "fathersOccupationCompany": String,
  "mothersName": String,
  "mothersAge": String,
  "mothersOccupation": String,
  "mothersOccupationCompany": String,
  "children": [childrenSchema],
  "education": educationSchema,
  "examination": [examinationSchema],
  "employmentHistory": [employmentHistorySchema],
  "training": [trainingSchema],
  "reference": [referenceSchema],
  "emergencyContact": emergencyContactSchema
})

const profileModel = mongoose.model('profile', employeeSchema)


app.get('/profile', function (req, res) {
  res.json({ success: 'get call succeed!', url: req.url });
});

app.get('/profile/*', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

app.post('/profile', async function (req, res) {
  const employeeProfile = {}
  const profileQuery = await profileModel.create(employeeProfile)
  res.json({ employee: profileQuery })
});

app.post('/profile/*', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});


app.put('/profile', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

app.put('/profile/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});


app.delete('/profile', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/profile/*', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function () {
  console.log("App started")
});

module.exports = app
