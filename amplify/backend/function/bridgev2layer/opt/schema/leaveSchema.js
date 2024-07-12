const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    sub: String,
    VL_BALANCE: { type: Number, default: 20 },
    SL_BALANCE: { type: Number, default: 5 },
    reset_date: Date
});

module.exports = mongoose.model('leave', leaveSchema)