const Order = require("./model");
const Transaction = require("../transaction/model");
const midtransClient = require("midtrans-client");
const mongoose = require("mongoose");
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

    // Periksa apakah pengguna sudah membeli kelas ini sebelumnya
    const existingOrder = await Order.findOne({
      user_id: req.user.user_id,
      order_item,
    });

    if (existingOrder) {
      return res
        .status(400)
        .json({ message: "Anda sudah membeli kelas ini sebelumnya" });
    }

    // Buat order baru
    const order = new Order({
      user_id: req.user.user_id,
      order_item,
      price: parseInt(body.harga),
      gross_amount: parseInt(body.harga),
      order_id: uuid.v4(),
    });

    // Simpan order ke database
    await order.save();

    const transactionDetails = {
      transaction_details: {
        order_id: order.order_id,
        gross_amount: order.gross_amount,
      },
      customer_details: {
        first_name: body.nama_lengkap,
        email: body.email,
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
  checkOrder: async (req, res, next) => {
    try {
      // Pastikan pengguna sudah login dan dapatkan user_id dari sesi atau token
      const userId = req.user.user_id;

      // Konversi id kelas menjadi ObjectId
      const classId = mongoose.Types.ObjectId(req.params.id);

      // Periksa apakah ada entri pembelian untuk kelas dengan id yang ditentukan dan user_id pengguna
      const order = await Order.findOne({
        user_id: userId,
        order_item: classId,
      });

      // Jika ada order, kelas sudah dibeli
      if (order) {
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
