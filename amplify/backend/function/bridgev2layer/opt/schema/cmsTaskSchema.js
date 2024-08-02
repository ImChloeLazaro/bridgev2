const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    team: String,
    manager: {
      sub: String,
      name: String,
      email: String,
      picture: String
    },
    client: {
      client_id: String,
      name: String,
      email: String,
      picture: String
    },
    processor: [
      {
        sub: String,
        name: String,
        email: String,
        picture: String,
        privilege: String //viewer, editor
      }
    ],
    reviewer: [
      {
        sub: String,
        name: String,
        email: String,
        picture: String
      }
    ],
    sla: [{
      name: String,
      instruction: String,
      status: String, //todo, pending, to review, done
      progress: String, //Good, Overdue, Adhoc
      escalate: Boolean, // marked as escalated to TL/ Admin
      duration: {
        start: Date,
        end: Date,
        recurrence: String, //Daily, Weekly, Monthly, Quarterly, Yearly
      },
      done_by: {
        sub: String,
        name: String,
        email: String,
        picture: String
      } //sub 
    }],
    status: { type: String, default: 'active' }, 
  })
  
  module.exports = mongoose.model('Task', taskSchema)