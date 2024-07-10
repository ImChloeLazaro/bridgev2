const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    contact: {
      name: String,
      address: String,
      number: String,
      email: String,
    },
    company: {// Company details
      name: String,
      address: String,
      contact_number: String,
      email: String,
      ABN: String,
      ACN: String,
      other_owner: Boolean,
    },
    business: { // Business details
      description: String,
      entity: String,
      tenure: String,
      trading_name: String,
    },
    financial: { // Financial details
      monthly_revenue: String,
      employee_count: Number,
      contractors_count: Number,
      has_outsource_payroll: Boolean,
      accounts: Number,
      monthly_transactions_count: Number,
      last_filed_tax: Date,
      accounting_method: String,
      invoice_preparation_method: String,
      bills_paying_method: String,
      is_GST_registered: Boolean,
      has_inventory: Boolean,
    },
    software: { // Software details
      accounting: [String],
      payroll: [String],
      billing: [String],
      expense_management: [String],
      reporting: [String],
      bookkeeping: [String],
    },
    documents: {
      ASIC: String, //ASIC company registration certificate or trust deed.
      tax_return: String, //previous year financial year
    },
    another_bookkeeper: Boolean,
    with_accountant: Boolean
  })
  
  module.exports = mongoose.model('Client', clientSchema)