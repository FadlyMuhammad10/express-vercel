const paymentService = require("../../services/payment");
const Transaction = require("../transaction/model");

module.exports = {
  payment: async (req, res, next) => {
    try {
      res.send(await paymentService.paymentKelas(req));
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },
  webhook: async (req, res) => {
    try {
      const webhookData = req.body;
      const transaction = new Transaction({
        order_id: webhookData.order_id,
        transaction_status:
          webhookData.status_code === "200" ? "settlement" : "failure",
      });
      await transaction.save();

      res.status(200).send("Webhook dari Midtrans berhasil diterima");
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },
};
