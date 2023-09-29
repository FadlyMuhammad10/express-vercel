const express = require("express");
const router = express.Router();

const { create, index, edit, deleted } = require("./controllers");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/authorization");

router.post("/create", auth, admin, create);
router.get("/", auth, admin, index);
router.put("/update/:id", auth, admin, edit);
router.delete("/delete/:id", auth, admin, deleted);

module.exports = router;
