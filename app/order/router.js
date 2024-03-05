const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const { create, checkMyCourse } = require("./controllers");

router.post("/create", auth, create);
router.get("/check-bought/:id", auth, checkMyCourse);

module.exports = router;
