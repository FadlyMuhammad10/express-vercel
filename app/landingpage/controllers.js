const Artikel = require("../artikel/model");
const Kelas = require("../kelas/model");

module.exports = {
  index: async (req, res, next) => {
    try {
      const kelas = await Kelas.find()
        .select("_id judul harga instructor kategori image_url")
        .populate("Kategori");

      res.status(200).json({ data: kelas });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },
  artikel: async (req, res, next) => {
    try {
      const artikel = await Artikel.find()
        .select("_id title kategori author pengertian date image_url")
        .populate("kategori");

      res.status(200).json({ data: artikel });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },
};
