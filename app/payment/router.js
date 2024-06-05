const express = require("express");
const router = express.Router();

const { webhook } = require("./controllers");

router.post("/webhook", webhook);

module.exports = router;
