const mongoose = require("mongoose");

// Define the Loan schema
const loanSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  loan_amount: {
    type: String,
    required: true,
  },
  repayment_duration: {
    type: String,
    required: true,
  },
  transaction_id: {
    type: String,
    required: true,
  },
});

// Create the loan model
const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
