const mongoose = require("mongoose");

let midtransSchema = mongoose.Schema({
  order_id: {
    type: String,
  },
  user_id: {
    type: String,
  },
});

module.exports = mongoose.model("Midtrans", midtransSchema);
