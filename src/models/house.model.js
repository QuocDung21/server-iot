const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const houseSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "house_data"
    },
    test : {
      type: String,
    },
    door: [
        {
            pass: {
                type: String,
                default: "01234567"
            },
            status: {
                type: Boolean,
                default: false
            }
        },
    ],
    device: [
        {
            fan: {
                type: Boolean,
                required: true,
            },
            led_1: {
                type: Boolean,
                required: true,
            },
            led_2: {
                type: Boolean,
                required: true,
            }

        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const House = mongoose.model("House", houseSchema);

module.exports = House;
