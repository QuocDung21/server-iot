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
  try {
    if (temperature != null || humidity != null) {
      await Esp.create({ temperature, humidity }, { new: true });
      return res.json(req.query);
    }
  } catch (error) {
    return res.json(error.mess);
  }
};

module.exports = {
  getEsp,
};
