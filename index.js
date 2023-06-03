const mongoose = require("mongoose");
const express = require("express");

require("dotenv").config();

const app = express();

const userRouter = require("./routes/user");
const kategoriRouter = require("./routes/kategori");
const lokasiRouter = require("./routes/lokasi");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(`Connected to MongoDB in host : ${con.connection.host}`);
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.use("/user", userRouter);
app.use("/kategori", kategoriRouter);
app.use("/lokasi", lokasiRouter);

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("Server started on port 3000");
});
