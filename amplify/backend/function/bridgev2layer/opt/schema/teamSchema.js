const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    sub : String,
    department: String,
    immediate_head: {
      sub: String,
      name: String,
      picture: String,
    },
    client: String
  })
//   const teamModel = mongoose.model("employee_team", teamSchema
module.exports = mongoose.model('employee_team', teamSchema)