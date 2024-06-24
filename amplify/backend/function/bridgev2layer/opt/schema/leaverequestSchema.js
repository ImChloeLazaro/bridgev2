const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
    sub: String,
    leaveDate: Date, //iso format
    leaveType: String,
    tlApproval: {type: String, default: 'pending'}, //default value is pending
    adminApproval: {type: String, default: 'pending'},
    numberOfHours: Number,
    reason: String,
    borrowedLeave: Boolean,
    leaveFiledDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('leaveRequest', leaveRequestSchema)
