const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
var path = require("path");

require("dotenv").config();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const userRouter = require("./routes/user");
const kategoriRouter = require("./routes/kategori");
const lokasiRouter = require("./routes/lokasi");
const kelasRouter = require("./routes/kelas");

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
console.log(process.env.MONGO_URI);

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// router
app.use("/user", userRouter);
app.use("/kategori", kategoriRouter);
app.use("/lokasi", lokasiRouter);
app.use("/kelas", kelasRouter);

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("Server started on port 3000");
});
