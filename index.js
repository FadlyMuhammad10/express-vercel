const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
var methodOverride = require("method-override");
var cors = require("cors");
var path = require("path");

require("dotenv").config();

const app = express();

app.use(cors());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

const userRouter = require("./routes/user");
const kategoriRouter = require("./routes/kategori");
const lokasiRouter = require("./routes/lokasi");
const kelasRouter = require("./routes/kelas");
const landingRouter = require("./routes/landingpage");
const detailpageRouter = require("./routes/detailpage");

const URL = `/api/v1`;

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
app.use(`${URL}/landingpage`, landingRouter);
app.use(`${URL}/detailpage`, detailpageRouter);

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("Server started on port 3000");
});
