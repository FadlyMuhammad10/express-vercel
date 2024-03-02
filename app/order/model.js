const mongoose = require("mongoose");

let orderSchema = mongoose.Schema({
  status: {
    type: String,
    enum: ["expire", "pending", "settlement", "capture"],
    default: "pending",
  },
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  order_item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Kelas",
  },

  order_id: {
    type: String,
  },
  gross_amount: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Order", orderSchema);
