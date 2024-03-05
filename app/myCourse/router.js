const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const { index } = require("./controllers");

router.get("/", auth, index);

module.exports = router;
