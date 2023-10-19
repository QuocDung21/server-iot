const addPerson = async (req, res) => {
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
  addPerson,
};
