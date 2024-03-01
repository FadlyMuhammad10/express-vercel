const MyCourse = require("./model");
const midtransClient = require("midtrans-client");
const uuid = require("uuid");

module.exports = {
  index: async (req, res, next) => {
    const { user_id } = req.query;

    try {
      // Temukan pengguna berdasarkan ID
      const user = await MyCourse.findOne(user_id)
        .populate("user_id")
        .populate({ path: "kelas_id", populate: { path: "Kategori" } });

      if (!user) {
        res.status(404).send("User not found");
        return;
      }

      res.status(200).json({ data: user });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  },
  create: async (req, res) => {
    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: process.env.server_key,
      clientKey: process.env.client_key,
    });

    const { kelas_id } = req.body;
    const { body } = req;
    try {
      // const my_course = await MyCourse.findOne({
      //   user_id: req.user.user_id,
      // });
      // Membuat transaksi pembayaran dengan Midtrans Snap
      const transactionDetails = {
        transaction_details: {
          order_id: "ORDER-" + uuid.v4(),
          gross_amount: parseInt(body.harga),
        },
        customer_details: {
          first_name: body.nama_lengkap,
          email: body.email,
        },
      };

      const transactionToken = await snap.createTransaction(transactionDetails);
      if (transactionToken.token) {
        // Tambahkan kelas ke dalam course pengguna di sini
        const myCourse = await MyCourse.findOne({ user_id: req.user.user_id });
        if (!myCourse) {
          const newCourse = new MyCourse({
            user_id: req.user.user_id,
            kelas_id: [kelas_id],
            transaction_status: "pending", // Anda bisa menetapkan status transaksi yang sesuai di sini
          });
          await newCourse.save();
        } else {
          myCourse.kelas_id.push(kelas_id);
          await myCourse.save();
        }

        // Kirim respons ke klien dengan token transaksi
        return res.status(200).json({ token: transactionToken.token });
      } else {
        return res
          .status(400)
          .json({ error: "Gagal membuat transaksi pembayaran." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};
