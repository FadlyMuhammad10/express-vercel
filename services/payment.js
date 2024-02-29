const uuid = require("uuid");
const MyCourse = require("../app/myCourse/model");

const midtransClient = require("midtrans-client");
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

    const { kelas_id } = req.body;
    const my_course = await MyCourse.findOne({
      user_id: body.user_id,
    });
    if (!my_course) {
      // Jika tidak ada, buat dokumen course baru dengan kelas_id yang diberikan
      const my_course = await MyCourse({
        kelas_id: [kelas_id],
        user_id: body.user_id,
      });

      await my_course.save();

      return res
        .status(201)
        .json({ message: "success add My Course", my_course });
    } else {
      // Jika sudah ada, periksa apakah kelas_id sudah ada dalam array kelas_id
      if (!my_course.kelas_id.includes(kelas_id)) {
        // Jika belum ada, tambahkan kelas_id ke dalam array kelas_id
        my_course.kelas_id.push(kelas_id);
        await my_course.save();

        return res
          .status(200)
          .json({ message: "Kelas berhasil ditambahkan ke course Anda." });
      } else {
        res.status(400).json({ error: "Kelas sudah ada dalam course Anda." });
      }
    }

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
        email: body.email,
      },
    };

    const snapToken = await snap.createTransaction(parameter);
    return { token: snapToken.token };
  },
};
