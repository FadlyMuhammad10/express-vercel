const Transactions = require("./model");
module.exports = {
  index: async (req, res, next) => {
    try {
      const transaction = await Transactions.find();

      res.status(200).json({ transaction });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },
};
