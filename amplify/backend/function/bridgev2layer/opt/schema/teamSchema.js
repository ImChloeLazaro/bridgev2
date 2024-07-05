const mongoose = require('mongoose');

const members = mongoose.Schema({
    sub: String,
    name: String,
    email: String,
    picture: String,
})
const teamSchema = mongoose.Schema({
    name: String,
    heads: [members],
    members: [members],
    client: String,
    status: {
      type: String,
      default: 'active'
    }, // active, archived
    created_at: {
        type: Date,
        default: Date.now
    }
  })
//   const teamModel = mongoose.model("employee_team", teamSchema
module.exports = mongoose.model('employee_team', teamSchema)