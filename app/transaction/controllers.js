const Transaction = require("./model");

module.exports = {
  createTransaction: async (req, res) => {
    const transaction = await Transaction.create(req.body);
    res.status(200).json({
      data: transaction,
    });
  },
};
