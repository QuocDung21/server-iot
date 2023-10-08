const Esp = require("../models/esp.model");

// Xử lý thêm vào csdl
const getEsp = async (req, res) => {
  // const esp = await Esp.find();
  const LDR = req.query.itensity;
  const fan = req.query.fan;
  const rain = req.query.rain;
  const temperature = req.query.temp;
  const humidity = req.query.humidity;
  const lamp = req.query.lamp;
  return ré.json(req.query);
  // Thực hiện các thao tác bạn muốn ở đây với dữ liệu nhận được từ query

  res.send("Response from the API"); // Phản hồi từ API
  return res.json({ esp });
};

module.exports = {
  getEsp,
};
