const mongoose = require("mongoose");
const uuid = require("uuid");

let kelasSchema = mongoose.Schema({
  judul: String,
  deskripsi_kelas: String,
  image_url: String,
  harga: Number,
  instructor: String,
  modules: [
    {
      _id: {
        type: String,
        default: uuid.v4, // Menggunakan uuidv4 sebagai nilai default
      },
      title: String, // Judul modul
      lessons: [
        // Pelajaran dalam modul
        {
          _id: {
            type: String,
            default: uuid.v4, // Menggunakan uuidv4 sebagai nilai default
          },
          title: String, // Judul pelajaran
          videoUrl: String, // URL video pelajaran
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Kelas", kelasSchema);
