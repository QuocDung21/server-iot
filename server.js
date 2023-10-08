const express = require("express");
const authRouter = require("./src/routers/auth.router.js");
const espRouter = require("./src/routers/esp.router.js");
const db = require("./src/config/dbConnect.js");
var bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

db();

// Sử dụng router trong ứng dụng chính
app.use("/api/auth", authRouter);
app.use("/api/esp", espRouter);

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
