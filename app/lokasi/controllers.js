const Kategori = require("./model");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { nama_lokasi } = req.body;
      const lokasi = await Lokasi({ nama_lokasi });
      await lokasi.save();
      res.status(201).json({ message: "success add lokasi", lokasi });
    } catch (error) {
      res.status(500).json({ message: "failed add lokasi" });
    }
  },
  index: async (req, res, next) => {
    try {
      const lokasi = await Lokasi.find();
      res.status(201).json({ lokasi });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  edit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { nama_lokasi } = req.body;
      const lokasi = await Lokasi.findOneAndUpdate(
        { _id: id },
        { nama_lokasi }
      );
      res.status(201).json({ lokasi, message: "success update data" });
    } catch (error) {
      res.status(500).json({ message: "failed update data" });
    }
  },
  deleted: async (req, res, next) => {
    try {
      const { id } = req.params;
      await Lokasi.findOneAndRemove({ _id: id });
      res.status(201).json({ message: "success delete data" });
    } catch (error) {
      res.status(500).json({ message: "failed delete data" });
    }
  },
};
