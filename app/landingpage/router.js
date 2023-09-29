const express = require("express");
const router = express.Router();

const { index, artikel } = require("./controllers");

router.get("/", index);
router.get("/artikel", artikel);

module.exports = router;
