const paymentService = require("../../services/payment");
const Transaction = require("../transaction/model");
const User = require("../user/model");

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
      console.log(webhookData);
      // Cari apakah data transaksi dengan order_id yang sama sudah ada dalam database
      const existingTransaction = await Transaction.findOne({
        order_id: webhookData.order_id,
      });
      if (existingTransaction) {
        // Jika data sudah ada, tidak perlu memasukkan data baru ke database
        existingTransaction.transaction_status = webhookData.transaction_status;
        await existingTransaction.save();
        return res
          .status(200)
          .send("Webhook dari Midtrans diterima (status transaksi diperbarui)");
      }
      const transaction = new Transaction({
        order_id: webhookData.order_id,
        transaction_id: webhookData.transaction_id,
        gross_amount: webhookData.gross_amount,
        transaction_status: webhookData.transaction_status,
        payment_type: webhookData.payment_type,
        fraud_status: webhookData.fraud_status,
        kelas_id: req.body,
        // webhookData.status_code === "200" ? "settlement" : "pending",
      });
      await transaction.save();

      // if (transaction.transaction_status === "settlement") {
      //   // Temukan pengguna berdasarkan alamat email
      //   const user = await User.findOne({ email });
      //   if (user) {
      //     // Tambahkan ID kursus ke dalam purchasedCourses pengguna
      //     user.purchasedCourses.push(course_id);
      //     await user.save();
      //   }
      // }
      res.status(200).send("Webhook dari Midtrans berhasil diterima");
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },
};
