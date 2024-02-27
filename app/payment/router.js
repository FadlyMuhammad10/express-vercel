const express = require("express");
const router = express.Router();

const { payment, webhook } = require("./controllers");
const auth = require("../../middleware/auth");

router.post("/payment", payment);
router.post("/webhook", webhook);

module.exports = router;
