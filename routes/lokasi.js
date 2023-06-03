const express = require("express");
const Lokasi = require("../models/lokasi_model");
const auth = require("../middleware/auth");
const admin = require("../middleware/authorization");

const router = express.Router();

router.post("/create", auth, admin, async (req, res) => {
  try {
    const { nama_lokasi } = req.body;
    const lokasi = await Lokasi({ nama_lokasi });
    await lokasi.save();
    res.status(201).json({ message: "success add lokasi", lokasi });
  } catch (error) {
    res.status(500).json({ message: "failed add lokasi" });
  }
});

router.get("/", auth, admin, async (req, res) => {
  try {
    const lokasi = await Lokasi.find();
    res.status(201).json({ lokasi });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update/:id", auth, admin, async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_lokasi } = req.body;
    const lokasi = await Lokasi.findOneAndUpdate({ _id: id }, { nama_lokasi });
    res.status(201).json({ lokasi, message: "success update data" });
  } catch (error) {
    res.status(500).json({ message: "failed update data" });
  }
});
router.delete("/delete/:id", auth, admin, async (req, res) => {
  try {
    const { id } = req.params;
    await Lokasi.findOneAndRemove({ _id: id });
    res.status(201).json({ message: "success delete data" });
  } catch (error) {
    res.status(500).json({ message: "failed delete data" });
  }
});
module.exports = router;
