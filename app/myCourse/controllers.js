const MyCourse = require("./model");
const midtransClient = require("midtrans-client");
const uuid = require("uuid");

module.exports = {
  index: async (req, res, next) => {
    try {
      // Temukan pengguna berdasarkan ID
      const user = await MyCourse.findOne({ user_id: req.user.user_id })
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
      const my_course = await MyCourse.findOne({
        user_id: req.user.user_id,
      });
      if (!my_course) {
        // Jika tidak ada, buat dokumen course baru dengan kelas_id yang diberikan
        const my_course = await MyCourse({
          kelas_id: [kelas_id],
          user_id: req.user.user_id,
        });

        await my_course.save();

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
        const transactionToken = await snap.createTransaction(
          transactionDetails
        );

        return res.status(201).json({
          message: "success add My Course",
          my_course,
          token: transactionToken.token,
        });
      } else {
        // Jika sudah ada, periksa apakah kelas_id sudah ada dalam array kelas_id
        if (!my_course.kelas_id.includes(kelas_id)) {
          // Jika belum ada, tambahkan kelas_id ke dalam array kelas_id
          my_course.kelas_id.push(kelas_id);
          await my_course.save();

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
          const transactionToken = await snap.createTransaction(
            transactionDetails
          );

          return res.status(200).json({
            message: "Kelas berhasil ditambahkan ke course Anda.",
            token: transactionToken.token,
          });
        } else {
          res.status(400).json({ error: "Kelas sudah ada dalam course Anda." });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};
