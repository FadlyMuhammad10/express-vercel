const express = require("express");
const Kelas = require("../models/kelas_model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const kelas = await Kelas.find().select("_id judul harga");

    res.status(200).json({ data: kelas });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

module.exports = router;
