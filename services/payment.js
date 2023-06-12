const uuid = require("uuid");

const midtransClient = require("midtrans-client");
// Create Snap API instance
exports.paymentKelas = async (req, res) => {
  const { body } = req;
  let token;

  let snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction: false,
    serverKey: "SB-Mid-server-HHAZPfs8KNjdpbvGHMKNf_9K",
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
      full_name: body.nama_lengkap, //body.nama_lengkap,
      tempat: body.tempat, //body.email,
      mapel: body.mapel, //body.asal_sekolah,
      tanggal: body.tanggal,
      waktu: body.waktu,
    },
  };

  const snapToken = await snap.createTransaction(parameter);
  return { token: snapToken.token };
};
