const mongoose = require("mongoose");
const uuid = require("uuid");

let kelasSchema = mongoose.Schema(
  {
    judul: {
      type: String,
      require: [true, "Judul Kelas harus diisi"],
    },
    deskripsi_kelas: {
      type: String,
      require: [true, "Deskripsi Kelas harus diisi"],
    },
    image_url: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
    harga: {
      type: Number,
      require: [true, "Harga Kelas harus diisi"],
    },
    instructor: {
      type: String,
      require: [true, "Nama pengajar Kelas harus diisi"],
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Kelas", kelasSchema);
