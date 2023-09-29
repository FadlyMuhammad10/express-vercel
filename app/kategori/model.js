const mongoose = require("mongoose");

let kategoriSchema = mongoose.Schema({
  nama_kategori: String,
});

module.exports = mongoose.model("Kategori", kategoriSchema);
