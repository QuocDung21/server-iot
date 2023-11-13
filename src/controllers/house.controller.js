const House = require("../models/house.model");

let io;
setTimeout(() => {
    io = require("../../socket.js").get();
}, 1000);


const updateHouse = async (req, res) => {
    const {fan, led1, led2, pass_door, status_door} = req.query;
    try {
        const house = await House.findOneAndUpdate(
            {name: "house_data"},
            {
                door: {
                    pass: pass_door,
                    status: status_door
                },
                device: {
                    fan, led_1: led1, led_2: led2
                }
            });
        return res.status(200).json({success: true, message: "Success", data: house});
    } catch (err) {
        return res.status(500).json({success: false, message: "Error", data: err.message});
    }
};

const getHouse = async (req, res) => {
    try {
        res.status(200).json({success: true, message: "Success"});

    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: error.message});
    }
};

const updateEsp = async (req, res) => {
    const {temp, humid} = req.query
    console.log(temp, humid)
    try {
        const esp = await House.findOneAndUpdate({name: "house_data"}, {
            esp: {
                temp,
                humid
            }
        })
        return res.status(200).json({success: "success", esp: esp})
    } catch (error) {
        return res.status(500).json({error})
    }


}


const update_door = async (req, res) => {
    try {

    } catch (e) {

    }
}


module.exports = {
    getHouse, updateHouse, update_door, updateEsp
};
