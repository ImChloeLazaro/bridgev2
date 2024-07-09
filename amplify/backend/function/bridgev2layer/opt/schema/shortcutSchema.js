const mongoose = require('mongoose');

const shortcutSchema = mongoose.Schema({
    sub: String,
    title: String,
    url: String,
    createdBy: {
      type: Date,
      default: Date.now(),
    },
  });
  
 module.exports = mongoose.model("Shortcut", shortcutSchema);