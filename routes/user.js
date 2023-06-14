const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

router.post("/register", async (req, res) => {
  try {
    const {
      nama_lengkap,
      email,
      password,
      confirm_password,
      alamat,
      asal_sekolah,
      alasan_ikut_program,
    } = req.body;
    if (password !== confirm_password) {
      return res.status(400).json({ message: "password do not match" });
    }
    const user = new User({
      nama_lengkap,
      email,
      password,
      confirm_password,
      alamat,
      asal_sekolah,
      alasan_ikut_program,
    });
    await user.save();
    res.status(201).json({ message: "success register", user });
  } catch (error) {
    res.status(500).json({ message: "failed register", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.json({ message: "user not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.json({ message: "password wrong" });
    }
    const token = jwt.sign(
      { user_id: user._id, role: user.role },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1800s",
      }
    );

    res.status(200).json({
      message: "success login",
      token,
      nama_lengkap: user.nama_lengkap,
      // email: user.email,
      // alamat: user.alamat,
    });
  } catch (error) {
    res.status(500).json({ message: "failed login", error });
  }
});
module.exports = router;
