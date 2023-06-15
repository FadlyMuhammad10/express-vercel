const express = require("express");
const Kelas = require("../models/kelas_model");
const Artikel = require("../models/artikel_model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const kelas = await Kelas.find().select("_id judul harga");

    res.status(200).json({ data: kelas });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});
router.get("/artikel", async (req, res) => {
  try {
    const artikel = await Artikel.find()
      .select("_id title kategori author pengertian date image_url")
      .populate("kategori");

    res.status(200).json({ data: artikel });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

module.exports = router;
