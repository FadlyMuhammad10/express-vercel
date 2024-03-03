const paymentService = require("../../services/payment");
const Transaction = require("../transaction/model");
const MyCourse = require("../myCourse/model");
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
      // Temukan transaksi berdasarkan order_id dari webhook
      const transaction = await Transaction.findOne({
        order_id_midtrans: webhookData.order_id,
      });

      if (!transaction) {
        console.log(
          "Transaksi tidak ditemukan dengan order_id:",
          webhookData.order_id
        );
        return res.status(404).send("Transaksi tidak ditemukan");
      }

      // Perbarui status transaksi sesuai dengan yang diterima dari webhook
      transaction.transaction_status = webhookData.transaction_status;
      transaction.transaction_id = webhookData.transaction_id;
      transaction.fraud_status = webhookData.fraud_status;
      transaction.payment_type = webhookData.payment_type;
      transaction.status_code = webhookData.status_code;
      transaction.transaction_time = webhookData.transaction_time;
      await transaction.save();

      // Temukan pesanan berdasarkan order_id yang terkait dengan transaksi
      const order = await Order.findOne({
        order_id: transaction.order_id_midtrans,
      });

      if (!order) {
        console.log(
          "Pesanan tidak ditemukan dengan order_id:",
          transaction.order_id_midtrans
        );
        return res.status(404).send("Pesanan tidak ditemukan");
      }

      // Perbarui status pesanan sesuai dengan status transaksi yang diterima dari webhook
      order.status = webhookData.transaction_status;
      await order.save();

      // Jika status transaksi adalah 'settlement', tambahkan kelas_id ke fitur "my course" (jika belum ada)
      if (webhookData.transaction_status === "settlement") {
        // Dapatkan user_id dari data order
        const { user_id } = order;

        // Cari dokumen my_course untuk user_id yang sama
        let myCourse = await MyCourse.findOne({ user_id });

        // Jika dokumen my_course sudah ada, tambahkan kelas_id baru ke dalam array kelas_id
        if (myCourse) {
          if (!myCourse.kelas_id.includes(order.order_item)) {
            myCourse.kelas_id.push(order.order_item);
            await myCourse.save();
          }
        } else {
          // Jika dokumen my_course belum ada, buat dokumen baru dengan user_id dan kelas_id
          myCourse = new MyCourse({
            user_id,
            kelas_id: [order.order_item], // Simpan kelas_id sebagai array
          });
          await myCourse.save();
        }
      }

      res.status(200).send("Webhook dari Midtrans berhasil diterima");
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },
};
