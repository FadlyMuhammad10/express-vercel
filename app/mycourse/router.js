const express = require("express");
const router = express.Router();

const { create } = require("./controllers");
const auth = require("../../middleware/auth");

router.post("/create", auth, create);

module.exports = router;
