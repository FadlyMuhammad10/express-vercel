const mongoose = require("mongoose");

let kelasSchema = mongoose.Schema({
  judul: String,
  deskripsi_kelas: String,
  image_url: String,
  harga: Number,
});

module.exports = mongoose.model("Kelas", kelasSchema);
