const paymentService = require("../../services/payment");
const Transaction = require("../transaction/model");
const Order = require("../order/model");

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
      // const { kelas_id } = req.body;
      // // Periksa apakah status transaksi adalah "settlement"
      // if (transaction_status === "settlement") {
      //   // Temukan kursus pengguna di database MyCourse berdasarkan user_id
      //   let myCourse = await MyCourse.findOne({ user_id: req.body });
      //   if (!myCourse) {
      //     // Jika kursus pengguna belum ada, buat kursus baru
      //     myCourse = new MyCourse({
      //       user_id: req.body,
      //       kelas_id: [kelas_id],
      //     });
      //   } else {
      //     // Jika kursus pengguna sudah ada, periksa apakah kelas_id sudah ada dalam array
      //     if (myCourse.kelas_id.includes(kelas_id)) {
      //       console.error(
      //         "Error: Pengguna sudah membeli kelas ini sebelumnya."
      //       );
      //       return res
      //         .status(400)
      //         .json({ error: "Anda sudah membeli kelas ini sebelumnya." });
      //     }
      //     // Jika belum, tambahkan kelas_id ke dalam array kelas_id
      //     myCourse.kelas_id.push(kelas_id);
      //   }
      //   // Simpan perubahan pada myCourse
      //   await myCourse.save();
      //   console.log("Kelas berhasil ditambahkan ke course pengguna.");
      // } else {
      //   console.log(
      //     'Status transaksi bukan "settlement", tidak ada tindakan yang diambil.'
      //   );
      // }

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
        // webhookData.status_code === "200" ? "settlement" : "pending",
      });
      await transaction.save();

      await Order.updateOne(
        { order_id: webhookData.order_id },
        { transaction_status: webhookData.transaction_status }
      );

      res.status(200).send("Webhook dari Midtrans berhasil diterima");
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },
};
