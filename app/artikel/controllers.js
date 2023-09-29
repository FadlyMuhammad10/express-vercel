const Artikel = require("./model");

module.exports = {
  create: async (req, res, next) => {
    try {
      const {
        title,
        image_url,
        kategori,
        date,
        artikel_web,
        author,
        pengertian,
        subbab1,
        artikel1,
        subbab2,
        artikel2,
      } = req.body;
      const artikel = await Artikel({
        title,
        image_url,
        kategori,
        date,
        artikel_web,
        author,
        pengertian,
        subbab1,
        artikel1,
        subbab2,
        artikel2,
      });
      await artikel.save();
      res.status(201).json({ message: "success add artikel", artikel });
    } catch (error) {
      res.status(500).json({ message: "failed add artikel" });
    }
  },
  index: async (req, res, next) => {
    try {
      const artikel = await Artikel.find().populate("kategori");
      res.status(201).json({ artikel });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
