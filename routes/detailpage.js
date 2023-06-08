const express = require("express");
const Kelas = require("../models/kelas_model");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const kelas = await Kelas.findOne({ _id: id });

    res.status(200).json({ data: kelas });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

module.exports = router;
