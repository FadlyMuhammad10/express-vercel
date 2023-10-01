const uuid = require("uuid");

const midtransClient = require("midtrans-client");
const Transaction = require("../app/transaction/model");
// Create Snap API instance
module.exports = {
  paymentKelas: async (req, res) => {
    const { body } = req;
    let token;

    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: process.env.server_key,
      clientKey: process.env.client_key,
    });

    let parameter = {
      transaction_details: {
        order_id: uuid.v4(), //uuid.v4(),
        gross_amount: body.harga, //body.harga,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: body.nama_lengkap,
        // tempat: body.tempat,
        // mapel: body.mapel,
        // tanggal: body.tanggal,
        // waktu: body.waktu,
        email: body.email,
        // address: body.alamat,
      },
    };

    const snapToken = await snap.createTransaction(parameter);
    return { token: snapToken.token };
  },
};
