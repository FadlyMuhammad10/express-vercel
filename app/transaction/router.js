const express = require("express");
const router = express.Router();

const { index } = require("./controllers");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/authorization");

router.get("/", auth, admin, index);

module.exports = router;
