const mongoose = require("mongoose");

let artikelSchema = mongoose.Schema({
  title: String,
  image_url: String,
  kategori: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Kategori",
  },
  date: Date,
  artikel_web: String,
  author: String,
  pengertian: String,
  subbab1: String,
  artikel1: String,
  subbab2: String,
  artikel2: String,
});

module.exports = mongoose.model("Artikel", artikelSchema);
