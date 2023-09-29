const express = require("express");
const router = express.Router();

const { create, index } = require("./controllers");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/authorization");

router.post("/create", auth, admin, create);
router.get("/", auth, admin, index);

module.exports = router;
