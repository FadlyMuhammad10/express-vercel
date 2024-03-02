const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const { create } = require("./controllers");

router.post("/create", auth, create);

module.exports = router;
