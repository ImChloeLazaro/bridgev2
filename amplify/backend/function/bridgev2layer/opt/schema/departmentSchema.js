const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: String,
    status: {
        type: String,
        default: 'active'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Department', departmentSchema);