const express = require("express");
const authRouter = require("./src/routers/auth.router.js");
const espRouter = require("./src/routers/esp.router.js");
const houseRouter = require("./src/routers/house.router.js");
const db = require("./src/config/dbConnect.js");
var bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(cors());
app.use(bodyParser.json());

db();

app.use("/api/auth", authRouter);
app.use("/api/esp", espRouter);
app.use("/api/house", houseRouter);

app.use("/", (req, res) => {
  return res.json("Server running");
});

const server = app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

const io = require("./socket.js").init(server);

io.on("connection", (socket) => {
  console.log("client-connect");

  socket.on("sendmess", (data) => {
    module.exports = data;
  });

  socket.on("disconnect", () => {
    console.log("client disconnect");
  });
});
