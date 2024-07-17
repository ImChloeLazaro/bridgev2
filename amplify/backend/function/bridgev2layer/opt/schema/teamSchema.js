const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    sub: String,
    name: String,
    email: String,
    picture: String,
    position: {default: 'Current Position', type: String},
    status: {default: 'active', type: String},
    employment_status: {default: 'Employment Status', type: String},
});

const teamSchema = new mongoose.Schema({
    name: String,
    heads: [memberSchema],
    members: [memberSchema],
    department: [
        {
            name: String,
            status: {type: String, default: 'active'}
        }
    ],
    client: [
        {
            _id: String,
            name: String,
            email: String
        }
    ],
    status: {
        type: String,
        default: 'active'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Team', teamSchema);
