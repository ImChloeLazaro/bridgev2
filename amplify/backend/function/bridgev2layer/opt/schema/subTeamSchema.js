const mongoose = require("mongoose")
const subTeamSchema = new mongoose.Schema({
    team: String,
    name: {
        type: String,
        required: true
    },
    tl: {
        sub: String,
        name: String,
        email: String,
        picture: String,
    },
    heads: [
        {
            sub: String,
            name: String,
            email: String,
            picture: String,
        },
    ],
    members: [
        {
            sub: String,
            name: String,
            email: String,
            picture: String,
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