const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    sub: String,
    title: String,
    status: { type: String, default: "todo" },
    created: { type: Date, default: Date.now },
    finished: Date
  })
  
module.exports = mongoose.model('Todo', todoSchema);