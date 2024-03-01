const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const { index, create } = require("./controllers");

router.get("/", auth, index);
router.post("/create", auth, create);

module.exports = router;
