const express = require("express");
const router = express.Router();

const { index, artikel } = require("./controllers");

router.get("/:id", index);
router.get("/artikel/:id", artikel);

module.exports = router;
