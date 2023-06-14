const express = require("express");
const Artikel = require("../models/artikel_model");
const auth = require("../middleware/auth");
const admin = require("../middleware/authorization");

const router = express.Router();

router.post("/create", auth, admin, async (req, res) => {
  try {
    const {
      title,
      image_url,
      kategori,
      date,
      artikel_web,
      author,
      pengertian,
    } = req.body;
    const artikel = await Artikel({
      title,
      image_url,
      kategori,
      date,
      artikel_web,
      author,
      pengertian,
    });
    await artikel.save();
    res.status(201).json({ message: "success add artikel", artikel });
  } catch (error) {
    res.status(500).json({ message: "failed add artikel" });
  }
});
router.get("/", auth, admin, async (req, res) => {
  try {
    const artikel = await Artikel.find().populate("kategori");
    res.status(201).json({ artikel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
