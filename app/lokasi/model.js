const mongoose = require("mongoose");

let lokasiSchema = mongoose.Schema({
  nama_lokasi: String,
});

module.exports = mongoose.model("Lokasi", lokasiSchema);
