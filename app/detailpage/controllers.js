const Artikel = require("../artikel/model");
const Kelas = require("../kelas/model");

module.exports = {
  index: async (req, res, next) => {
    try {
      const { id } = req.params;
      const kelas = await Kelas.findOne({ _id: id }).populate("Kategori");

      res.status(200).json({ data: kelas });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },
  artikel: async (req, res, next) => {
    try {
      const { id } = req.params;
      const artikel = await Artikel.findOne({ _id: id }).populate("kategori");

      res.status(200).json({ data: artikel });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },
};
