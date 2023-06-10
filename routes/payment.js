const express = require("express");
const paymentService = require("../services/payment");
const router = express.Router();

router.post("/payment", async (req, res) => {
  try {
    res.send(await paymentService.paymentKelas(req));
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

module.exports = router;
