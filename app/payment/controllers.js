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
      // Cari apakah data transaksi dengan order_id yang sama sudah ada dalam database
      const existingTransaction = await Transaction.findOne({
        order_id: webhookData.order_id,
      });
      if (existingTransaction) {
        // Jika data sudah ada, tidak perlu memasukkan data baru ke database
        existingTransaction.transaction_status =
          webhookData.status_code === "200" ? "success" : "failure";
        await existingTransaction.save();
        return res
          .status(200)
          .send("Webhook dari Midtrans diterima (status transaksi diperbarui)");
      }
      const transaction = new Transaction({
        order_id: webhookData.order_id,
        transaction_id: webhookData.transaction_id,
        gross_amount: webhookData.gross_amount,
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
