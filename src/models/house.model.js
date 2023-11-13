const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const houseSchema = new mongoose.Schema({
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

const House = mongoose.model("House", houseSchema);

module.exports = House;
