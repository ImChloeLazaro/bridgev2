const mongoose = require("mongoose")
const subTeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    head: {
        sub: String,
        name: String,
        email: String,
        picture: String,
    },
    members: [
        {
            sub: String,
            name: String,
            email: String,
            picture: String,
            position: { default: 'Current Position', type: String },
            status: { default: 'active', type: String },
            employment_status: { default: 'Employment Status', type: String },
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
})

module.exports = mongoose.model('SubTeam', subTeamSchema)