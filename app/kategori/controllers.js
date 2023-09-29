const Kategori = require("./model");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { nama_kategori } = req.body;
      const kategori = await Kategori({ nama_kategori });
      await kategori.save();
      res.status(201).json({ message: "success add kategori", kategori });
    } catch (error) {
      res.status(500).json({ message: "failed add kategori" });
    }
  },
  index: async (req, res, next) => {
    try {
      const kategori = await Kategori.find();
      res.status(201).json({ kategori });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  edit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { nama_kategori } = req.body;
      const kategori = await Kategori.findOneAndUpdate(
        { _id: id },
        { nama_kategori }
      );
      res.status(201).json({ kategori, message: "success update data" });
    } catch (error) {
      res.status(500).json({ message: "failed update data" });
    }
  },
  deleted: async (req, res, next) => {
    try {
      const { id } = req.params;
      await Kategori.findOneAndRemove({ _id: id });
      res.status(201).json({ message: "success delete data" });
    } catch (error) {
      res.status(500).json({ message: "failed delete data" });
    }
  },
};
