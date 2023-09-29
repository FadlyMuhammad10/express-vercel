const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let userSchema = mongoose.Schema(
  {
    nama_lengkap: {
      type: String,
      require: [true, "Nama harus diisi"],
    },
    email: {
      type: String,
      require: [true, "Email harus diisi"],
    },
    password: {
      type: String,
      require: [true, "Password harus diisi"],
    },
    confirm_password: {
      type: String,
      require: [true, "Konfirmasi Password harus diisi"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    alamat: {
      type: String,
      require: [true, "Alamat harus diisi"],
    },
    asal_sekolah: {
      type: String,
      require: [true, "Asal sekolah harus diisi"],
    },
    alasan_ikut_program: {
      type: String,
      require: [true, "Alasan ikut program harus diisi"],
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password", "confirm_password")) {
    // jika user isinya password
    user.password = await bcrypt.hash(user.password, 8);
    user.confirm_password = await bcrypt.hash(user.confirm_password, 8);
  }
});
module.exports = mongoose.model("User", userSchema);
