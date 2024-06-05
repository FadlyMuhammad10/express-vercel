const cloudinary = require("../../services/cloudinaryConfig");
const Image = require("./model");

module.exports = {
  create: async (req, res, next) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "kelasImages",
      });

      const image = new Image({
        name: result.secure_url,
      });

      await image.save();
      res.status(201).json({ message: "Success add images", image });
    } catch (error) {
      res.status(500).json({ message: "failed add images" });
    }
  },
};
