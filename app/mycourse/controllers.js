const MyCourse = require("./model");

module.exports = {
  create: async (req, res, next) => {
    try {
      const my_course = await MyCourse(req.body);

      await my_course.save();

      res.status(201).json({ message: "success add My Course", my_course });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },
};
