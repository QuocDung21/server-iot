const Esp = require("../models/esp.model");
const { execSync } = require("child_process");

let io;
setTimeout(() => {
  io = require("../../socket.js").get();
}, 1000);

const checkRain = async (req, res) => {
  try {
    const highRainProbabilityData = [
      { temperature: 20, humidity: 85 }, // Có mưa
      { temperature: 18, humidity: 80 }, // Có mưa
      { temperature: 22, humidity: 90 }, // Có mưa
      { temperature: 21, humidity: 88 }, // Có mưa
      { temperature: 19, humidity: 82 }, // Có mưa
      { temperature: 20, humidity: 84 }, // Có mưa
      { temperature: 17, humidity: 77 }, // Có mưa
    ];

    const predictions = highRainProbabilityData.map((data) => {
      const temperature = data.temperature;
      const humidity = data.humidity;
      const result = execSync(`python predict.py ${temperature} ${humidity}`);
      const rainPrediction = parseFloat(result.toString().trim());
      return { temperature, humidity, rainPrediction };
    });

    // Tính tỷ lệ trung bình của khả năng mưa
    const averageRainProbability =
      predictions.reduce(
        (sum, prediction) => sum + prediction.rainPrediction,
        0
      ) / predictions.length;

    const percentRain = (averageRainProbability * 100).toFixed(2);

    res.json({ success: true, averageRainProbability: `${percentRain}%` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// const checkRain = async (req, res) => {
//   try {
//     const recentData = await Esp.find().sort({ createdAt: -1 }).limit(7);

//     const highRainProbabilityData = [
//       { temperature: 20, humidity: 85 }, // Có mưa
//       { temperature: 18, humidity: 80 }, // Có mưa
//       { temperature: 22, humidity: 90 }, // Có mưa
//       { temperature: 21, humidity: 88 }, // Có mưa
//       { temperature: 19, humidity: 82 }, // Có mưa
//       { temperature: 20, humidity: 84 }, // Có mưa
//       { temperature: 17, humidity: 77 }, // Có mưa
//     ];

//     const predictions = recentData.map((data) => {
//       const temperature = data.nhietdo;
//       const humidity = data.doam;
//       const result = execSync(`python predict.py ${temperature} ${humidity}`);
//       const rainPrediction = parseFloat(result.toString().trim());
//       return { temperature, humidity, rainPrediction };
//     });

//     // Tính tỷ lệ trung bình của khả năng mưa
//     const averageRainProbability =
//       predictions.reduce(
//         (sum, prediction) => sum + prediction.rainPrediction,
//         0
//       ) / predictions.length;

//     console.log(predictions);

//     res.json({ success: true, averageRainProbability });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

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
