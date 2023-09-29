const express = require("express");
const router = express.Router();

const { payment, callback } = require("./controllers");

router.post("/payment", payment);
// router.post("/callback", callback);

module.exports = router;
