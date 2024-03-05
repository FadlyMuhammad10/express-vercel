const MyCourse = require("./model");

module.exports = {
  index: async (req, res, next) => {
    try {
      // Temukan pengguna berdasarkan ID
      const user = await MyCourse.findOne({ user_id: req.user.user_id })
        .populate({ path: "user_id", select: "_id nama_lengkap email" })
        .populate({ path: "kelas_id", populate: { path: "kategori" } });

      if (!user) {
        res.status(404).send("User not found");
        return;
      }

      res.status(200).json({ data: user });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  },
};
