const mongoose = require("mongoose");

// Định nghĩa schema cho dữ liệu ESP
const espSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Tạo mô hình ESP từ schema
const Esp = mongoose.model("Esp", espSchema);

module.exports = Esp;
