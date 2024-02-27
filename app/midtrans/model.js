const mongoose = require("mongoose");

let midtransSchema = mongoose.Schema({
  order_id: {
    type: String,
    ref: "Transaction",
  },
  user_id: {
    type: String,
    ref: "User",
  },
});

module.exports = mongoose.model("Midtrans", midtransSchema);
