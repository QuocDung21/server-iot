const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const espSchema = new mongoose.Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    fan: {
        type: Number,
        required: true,
    },
    rain: {
        type: Number,
        required: true,
    },
    mua: {
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
