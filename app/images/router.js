const express = require("express");
const router = express.Router();

const { create } = require("./controllers");
const upload = require("../../middleware/multer");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/authorization");

router.post("/create", upload.single("image"), auth, admin, create);

module.exports = router;
