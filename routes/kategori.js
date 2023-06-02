const express = require("express");
const Kategori = require("../models/kategori_model");
const auth = require("../middleware/auth");
const admin = require("../middleware/authorization");

const router = express.Router();

router.post("/create", auth, admin, async (req, res) => {
  try {
    const { nama_kategori } = req.body;
    const kategori = await Kategori({ nama_kategori });
    await kategori.save();
    res.status(201).json({ message: "success add kategori", kategori });
  } catch (error) {
    res.status(500).json({ message: "failed add kategori" });
  }
});

router.get("/", auth, admin, async (req, res) => {
  try {
    const kategori = await Kategori.find();
    res.status(201).json({ kategori });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update/:id", auth, admin, async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_kategori } = req.body;
    const kategori = await Kategori.findOneAndUpdate(
      { _id: id },
      { nama_kategori }
    );
    res.status(201).json({ kategori, message: "success update data" });
  } catch (error) {
    res.status(500).json({ message: "failed update data" });
  }
});
router.delete("/delete/:id", auth, admin, async (req, res) => {
  try {
    const { id } = req.params;
    await Kategori.findOneAndRemove({ _id: id });
    res.status(201).json({ message: "success delete data" });
  } catch (error) {
    res.status(500).json({ message: "failed delete data" });
  }
});
module.exports = router;
