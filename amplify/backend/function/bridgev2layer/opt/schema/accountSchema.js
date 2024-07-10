const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    sub : String,
    email : String,
    name : String,
    hasOnboardingData : {
      type : Boolean,
      default : false
    },
    role : {
      type : [roleSchema],
      default : [{name: 'USER', permissions: 'USER'}]
    },
    createdBy: {
      type: Date,
      default: Date.now()
    }
  })
  
  module.exports = mongoose.model('account', accountSchema)