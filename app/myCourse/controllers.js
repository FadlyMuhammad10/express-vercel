const User = require("../user/model");

module.exports = {
  index: async (req, res, next) => {
    const { userId } = req.query;

    try {
      // Temukan pengguna berdasarkan ID
      const user = await User.findById(userId);

      if (!user) {
        res.status(404).send("User not found");
        return;
      }

      // Kirim daftar kursus yang telah dibeli oleh pengguna
      const purchasedCourses = await Course.find({
        _id: { $in: user.purchasedCourses },
      });
      res.status(200).json(purchasedCourses);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  },
};
