const mongoose = require('mongoose');

const default_benefits = [
    {
      name: "HMO",
      number: "###-###-####",
      status: "unavailable",
      availability: "pending"
    },
    {
      name: "PAGIBIG",
      number: "###-###-####",
      status: "unavailable",
      availability: "pending"
    },
    {
      name: "SSS",
      number: "###-###-####",
      status: "unavailable",
      availability: "pending"
    },
    {
      name: "PhilHealth",
      number: "###-###-####",
      status: "unavailable",
      availability: "pending"
    }
  ]
  
  const benefit = mongoose.Schema({
    name: String,
    number: String,
    status: String,
    availability: String,
  })
  
  const benefitSchema = mongoose.Schema({
    sub: String,
    benefits: {
      type: [benefit],
      default: default_benefits
    }
  })

    module.exports = mongoose.model('benefit', benefitSchema)