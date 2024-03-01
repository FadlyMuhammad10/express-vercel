const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const { payment, webhook } = require("./controllers");

router.post("/payment", payment);
router.post("/webhook", auth, webhook);

module.exports = router;
