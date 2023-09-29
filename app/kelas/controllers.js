const Kelas = require("./model");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { judul, deskripsi_kelas, harga, image_url } = req.body;
      const kelas = await Kelas({
        judul,
        deskripsi_kelas,
        harga,
        image_url,
      });
      await kelas.save();
      res.status(201).json({ message: "success add kelas", kelas });
    } catch (error) {
      res.status(500).json({ message: "failed add kelas" });
    }
  },
  index: async (req, res, next) => {
    try {
      const kelas = await Kelas.find();
      res.status(201).json({ kelas });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  edit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { judul, deskripsi_kelas, harga, image_url } = req.body;
      const kelas = await Kelas.findOneAndUpdate(
        { _id: id },
        { judul, deskripsi_kelas, harga, image_url }
      );
      res.status(201).json({ kelas, message: "success update data" });
    } catch (error) {
      res.status(500).json({ message: "failed update data" });
    }
  },
  deleted: async (req, res, next) => {
    try {
      const { id } = req.params;
      await Kelas.findOneAndRemove({ _id: id });
      res.status(201).json({ message: "success delete data" });
    } catch (error) {
      res.status(500).json({ message: "failed delete data" });
    }
  },
};
