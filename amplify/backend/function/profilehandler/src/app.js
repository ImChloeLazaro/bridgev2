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
<<<<<<< HEAD
const applicationDetailsSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  middle_name: String,
  vacancy_thru: String,
  referred_by: String,
  date_application: String,
  date_availability: String,
  applied_for: String,
  salary: String,
});

const employeeInformationSchema = mongoose.Schema({
  present_address: String,
  permanent_address: String,
  residence_status: String,
  gender: String,
  birthdate: String,
  civil_status: String,
  age: String,
  email_address: String,
  birthplace: String,
  home_phone_number: String,
  citizenship: String,
  mobile_number: String,
  religion: String,
  language: String,
});

const governmentIdInformationSchema = mongoose.Schema({
  tin: String,
  sss: String,
  pagibig: String,
  philhealth: String,
});

const collegeSchema = mongoose.Schema({
  name: String,
  address: String,
  date_of_attendance: String,
  degree_major: String,
});

const highschoolSchema = mongoose.Schema({
  name: String,
  address: String,
  date_of_attendance: String,
  degree_major: String,
});

const postGraduateSchema = mongoose.Schema({
  name: String,
  address: String,
  date_of_attendance: String,
  degree_major: String,
});

const technicalVocationalSchema = mongoose.Schema({
  name: String,
  address: String,
  date_of_attendance: String,
  degree_major: String,
});

const examinationTakenSchema = mongoose.Schema({
  id: String,
  certification: String,
  date_taken: String,
  government_association: String,
});

const fatherSchema = mongoose.Schema({
  name: String,
  age: String,
  occupation: String,
  company: String,
});

const motherSchema = mongoose.Schema({
  name: String,
  age: String,
  occupation: String,
  company: String,
});

const childrenSchema = mongoose.Schema({
  id: String,
  name: String,
  age: String,
  civil_status: String,
  company: String,
  occupation: String, // Corrected the typo here
});

const emergencyContactSchema = mongoose.Schema({
  name: String,
  address: String,
  contact_number: String,
  relationship: String,
});

const employmentHistorySchema = mongoose.Schema({
  id: String,
  date_of_attendance: String,
  duration: String,
  position_held: String,
  reason_leaving: String,
});

const referencesSchema = mongoose.Schema({
  id: String,
  name: String,
  contact_number: String,
  company_name_address: String,
  position_held: String,
});

const trainingsAttendedSchema = mongoose.Schema({
  id: String,
  program_name: String,
  provider: String,
  duration: String,
  topic_specialization: String,
});

const employeeSchema = mongoose.Schema({
  profile: {
    application: {
      application_details: applicationDetailsSchema,
      employee_information: employeeInformationSchema,
      government_id_information: governmentIdInformationSchema,
    },
    background: {
      educational_background: {
        college: collegeSchema,
        highschool: highschoolSchema,
        post_graduate: postGraduateSchema,
        technical_vocational: technicalVocationalSchema,
      },
      examination_taken: [examinationTakenSchema],
      family_background: {
        father: fatherSchema,
        mother: motherSchema,
        children: [childrenSchema],
        references: [referencesSchema],
        trainings_attended: [trainingsAttendedSchema],
      },
    },
    contact: {
      emergency_contact: emergencyContactSchema,
    },
    employment: {
      employment_history: [employmentHistorySchema],
      references: [referencesSchema], // Assuming this should be an array of references
    },
    sub : String
  },
});

const profileModel = mongoose.model('profile', employeeSchema);
=======

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

>>>>>>> parent of 71af41d (fixed shortcuts and now clickable)
app.get('/profile', function (req, res) {
  res.json({ success: 'get call succeed!', url: req.url });
});

<<<<<<< HEAD
app.post('/profile', async function (req, res) {
  try {
    const { application, background, contact, employment, sub } = req.body;
    const profile = await profileModel.create({
      profile: {
        application,
        background,
        contact,
        employment,
        sub
      }
    })
    res.status(200).json({ result: profile });
  } catch (error) {
    console.error('Error processing the request:', error);
    res.status(500).json({ error: error });
  }
});

=======
app.get('/profile/*', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

app.post('/profile', async function (req, res) {
  // const employeeProfile = {}
  // const profileQuery = await profileModel.create(employeeProfile)
  // res.json({ employee: profileQuery })
  const { application_details } = req.body

  // const extractedValues = Object.fromEntries(
  //   Object.entries(application_details).map(([key, value]) => [key, value.value])
  // );

  res.json({ response: application_details.firstname })
});

app.post('/profile/*', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});


>>>>>>> parent of 71af41d (fixed shortcuts and now clickable)
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
