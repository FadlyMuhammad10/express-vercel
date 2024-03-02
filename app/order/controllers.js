const Order = require("./model");
const midtransClient = require("midtrans-client");
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

    return res.status(201).json({
      message: "success add order",
      order,
      token: transactionToken.token,
    });
  },
};
