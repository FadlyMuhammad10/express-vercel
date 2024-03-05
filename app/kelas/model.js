const mongoose = require("mongoose");
const uuid = require("uuid");

let kelasSchema = mongoose.Schema(
  {
    judul: {
      type: String,
    },
    deskripsi_kelas: {
      type: String,
    },
    image_url: {
      type: String,
    },
    harga: {
      type: Number,
    },
    instructor: {
      type: String,
    },
    kategori: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kategori",
    },
    materi: [
      {
        _id: {
          type: String,
          default: uuid.v4, // Menggunakan uuidv4 sebagai nilai default
        },
        judulMateri: String,
        videoUrl: String,
      },
    ],
    // modules: [
    //   {
    //     _id: {
    //       type: String,
    //       default: uuid.v4, // Menggunakan uuidv4 sebagai nilai default
    //     },
    //     title: String, // Judul modul
    //     lessons: [
    //       // Pelajaran dalam modul
    //       {
    //         _id: {
    //           type: String,
    //           default: uuid.v4, // Menggunakan uuidv4 sebagai nilai default
    //         },
    //         title: String, // Judul pelajaran
    //         videoUrl: String, // URL video pelajaran
    //       },
    //     ],
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Kelas", kelasSchema);
