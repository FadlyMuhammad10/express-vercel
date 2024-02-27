const mongoose = require("mongoose");

let transactionSchema = mongoose.Schema({
  transaction_status: {
    type: String,
    default: "pending",
  },
  transaction_id: {
    type: String,
  },
  order_id: {
    type: String,
  },
  gross_amount: {
    type: Number,
    default: 0,
  },
  payment_type: {
    type: String,
  },
  fraud_status: {
    type: String,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
