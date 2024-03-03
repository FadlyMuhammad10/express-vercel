const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const { create, checkOrder } = require("./controllers");

router.post("/create", auth, create);
router.get("/check-bought/:classId", checkOrder);

module.exports = router;
