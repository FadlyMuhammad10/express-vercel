const mongoose = require("mongoose");

let MyCourseSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  kelas_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kelas",
    },
  ],
  transaction_status: {
    type: String,
    enum: ["pending", "success", "settlement", "expire", "cancel"], // Sesuaikan dengan status yang diperbolehkan
    default: "pending", // Nilai default bisa disesuaikan dengan kebutuhan Anda
  },
});

module.exports = mongoose.model("MyCourse", MyCourseSchema);
