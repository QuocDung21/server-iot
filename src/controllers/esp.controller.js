const Esp = require("../models/esp.model");

const getEsp = async (req, res) => {
  const LDR = req.query.itensity;
  const fan = req.query.fan;
  const rain = req.query.rain;
  const temperature = req.query.temp;
  const humidity = req.query.humidity;
  const lamp = req.query.lamp;
  try {
    // if (temperature != null || humidity != null) {
    console.log(req.query);
    await Esp.create({ temperature, humidity }, { new: true });
    return res.json(req.query);
    // }
  } catch (error) {
    return res.json(error.mess);
  }
};

module.exports = {
  getEsp,
};
