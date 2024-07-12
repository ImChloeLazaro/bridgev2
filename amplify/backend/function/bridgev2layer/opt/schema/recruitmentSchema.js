const mongoose = require('mongoose')
const recruitmentSchema = mongoose.Schema({
    sub: String,
    employee_number: Number,
    hiredate: String,
    is_active: Boolean,
    status: String,
    position: String,
  })
  
module.exports = mongoose.model('recruitment', recruitmentSchema)