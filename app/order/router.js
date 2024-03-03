const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const { create, checkOrder } = require("./controllers");

router.post("/create", auth, create);
router.get("/check-bought/:id", checkOrder);

module.exports = router;
