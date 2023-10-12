const Esp = require("../models/esp.model");
const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");

let io;
setTimeout(() => {
    io = require("../../socket.js").get();
}, 1000);

const checkRain = async (req, res) => {
  try {
    // Lấy 7 mốc thời gian gần nhất
    const recentData = await Esp.find().sort({ createdAt: -1 }).limit(7);

    // Tạo mảng lưu trữ nhiệt độ và độ ẩm
    const temperatureAndHumidity = [];

    // Duyệt qua các mốc thời gian gần nhất
    for (const data of recentData) {
      temperatureAndHumidity.push([data.nhietdo, data.doam]);
    }

    // Tải mô hình đã được huấn luyện trước đó (ví dụ: model.json)
    const model = await tf.loadLayersModel("file://model.json");

    // Chuẩn bị dữ liệu đầu vào
    const input = tf.tensor(temperatureAndHumidity);

    // Dự đoán khả năng mưa
    const prediction = model.predict(input);

    // Lấy giá trị dự đoán
    const rainProbabilities = prediction.arraySync();

    res.json({ success: true, rainProbabilities: rainProbabilities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getEsp = async (req, res) => {
  try {
    const itensity = req.query.itensity;
    const fan = req.query.fan;
    const rain = req.query.rain;
    const temp = req.query.temp;
    const humidity = req.query.humidity;
    const lamp = req.query.lamp;
    console.log(req.query);
    const data = {
      itensity: parseFloat(itensity, 0),
      fan: fan,
      rain: rain,
      temp: temp,
      lamp: lamp,
      humidity: humidity,
    };
    const newob = new Esp({
      nhietdo: temp,
      doam: humidity,
      mua: rain,
    });
    await newob.save();
    io.emit("HouseData", data);
    res.json({ success: true, data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

module.exports = {
  getEsp,
  checkRain,
};
