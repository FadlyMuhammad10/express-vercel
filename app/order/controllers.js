const Order = require("./model");
const Transaction = require("../transaction/model");
const MyCourse = require("../myCourse/model");
const midtransClient = require("midtrans-client");
const { ObjectId } = require("mongoose").Types;
const uuid = require("uuid");

let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: process.env.server_key,
  clientKey: process.env.client_key,
});

module.exports = {
  create: async (req, res, next) => {
    const { order_item } = req.body;
    const { body } = req;

    // Buat order baru
    const order = new Order({
      user_id: req.user.user_id,
      order_item,
      price: parseInt(body.harga),
      gross_amount: parseInt(body.harga),
      order_id: uuid.v4(),
      email: body.email,
      nama_lengkap: body.nama_lengkap,
    });

    // Simpan order ke database
    await order.save();

    const transactionDetails = {
      transaction_details: {
        order_id: order.order_id,
        gross_amount: order.gross_amount,
      },
      customer_details: {
        first_name: order.nama_lengkap,
        email: order.email,
      },
    };
    const transactionToken = await snap.createTransaction(transactionDetails);

    const transaction = new Transaction({
      order_id_midtrans: transactionDetails.transaction_details.order_id, // Simpan order_id Midtrans
      gross_amount: transactionDetails.transaction_details.gross_amount,

      // transaction_id: webhookData.transaction_id, // Gunakan transaction_id dari Midtrans
      // transaction_status: webhookData.transaction_status,
    });
    await transaction.save();

    return res.status(201).json({
      message: "success add order",
      order,
      token: transactionToken.token,
    });
  },
  checkMyCourse: async (req, res, next) => {
    try {
      // Pastikan pengguna sudah login dan dapatkan user_id dari sesi atau token
      const userId = req.user.user_id;

      // Konversi id kelas menjadi ObjectId
      const classId = new ObjectId(req.params.id);

      // Periksa apakah ada entri dalam my course untuk kelas dengan id yang ditentukan dan user_id pengguna
      const myCourse = await MyCourse.findOne({
        user_id: userId,
        kelas_id: classId,
      });

      // Jika ada order, kelas sudah dibeli
      if (myCourse) {
        return res.json({ isBought: true });
      } else {
        return res.json({ isBought: false });
      }
    } catch (error) {
      console.error("Error checking if class is bought:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
