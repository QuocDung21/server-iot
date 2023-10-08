const Esp = require("../models/esp.model");

// Xử lý thêm vào csdl
const getEsp = async (req, res) => {
  const esp = await Esp.find();
  return res.json({ esp });
};

module.exports = {
  getEsp,
};
