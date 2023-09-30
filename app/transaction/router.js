const express = require("express");
const router = express.Router();

const { createTransaction } = require("./controllers");

router.post("/create", createTransaction);

module.exports = router;
