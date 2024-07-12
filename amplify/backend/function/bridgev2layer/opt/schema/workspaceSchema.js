const mongoose = require('mongoose');

const workspaceSchema = mongoose.Schema({
    item: String,
    managers: [
      {
        sub : String, 
        name : String, 
        email : String, 
        picture : String
      }
    ],
    processors: [
      {
        sub : String, 
        name : String, 
        email : String, 
        picture : String
      }
    ],
    date: Date,
    dateCompleted: Date,
    status: String,
    remarks: String,
    type: String
  })
  
  module.exports = mongoose.model('workspace', workspaceSchema);