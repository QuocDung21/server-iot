const House = require("../models/house.model");
const {execSync} = require("child_process");

let io;
setTimeout(() => {
    io = require("../../socket.js").get();
}, 1000);


const updateHouse = async (req, res) => {
    const fan = req.query.fan;
    try {
        const house = await House.create({
            fan
        })
        res.status(200).json({success: true, message: "Success", data: house});
    } catch (err) {

    }

}

const getHouse = async (req, res) => {
    try {
        res.status(200).json({success: true, message: "Success"});

    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: error.message});
    }
};


module.exports = {
    getHouse,
    updateHouse
};
