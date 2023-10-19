const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const espSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  collections: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Esp = mongoose.model("Esp", espSchema);

module.exports = Esp;
