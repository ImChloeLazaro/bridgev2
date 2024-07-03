const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    name: [String],
    permissions: [String]
  })
  
  const userSchema = mongoose.Schema({
    sub: String,
    email: String,
    name: String,
    picture: String,
    hasOnboardingData: {
      type: Boolean,
      default: false
    },
    role: {
      type: [roleSchema],
      default: [
        {
          name: 'USER',
          permissions: ['processor']
        }
      ]
    },
    createdBy: {
      type: Date,
      default: Date.now
    }
  })
  
  module.exports = mongoose.model('user', userSchema)