const mongoose = require("mongoose");

let MyCourseSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  kelas_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Kelas",
  },
});

module.exports = mongoose.model("MyCourse", MyCourseSchema);
