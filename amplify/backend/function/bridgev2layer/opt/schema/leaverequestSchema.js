const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
    sub: String,
    leaveDate: Date, //iso format
    leaveType: String,
    isTLApproved: {type: Boolean, default: false},
    isAdminApproved: {type: Boolean, default: false},
    numOfHours: Number,
    reason: String,
    borrowedLeave: Boolean,
    leaveFiledDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('leaveRequest', leaveRequestSchema)
