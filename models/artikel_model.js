const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let artikelSchema = mongoose.Schema({
    title: String,
    image_url: String,
    kategori:String,
    Date:String,
    artikel_web:String,
    author:String,
    pengertian:String,
  });
  
  module.exports = mongoose.model("Artikel", artikelSchema);
  