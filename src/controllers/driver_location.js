
const Location = require("../models/driver_location")

module.exports = {
    postLocation: async (req, res) => {
        try {
            const filter = { phone_no: req.body.phone_no };
            const update = { $set: req.body };
            const options = { upsert: true };
            let response = await Location.updateOne(filter, update, options);
            return res.status(200).send({
                message: "Updated",
                status: true,
                data: response
            })
        }
        catch (error) {
            return res.status(400).send({
                message: "Error",
                status: false,
                data: error
            })

        }
    },
    getLocation: async (req, res) => {
        try {
            let response = await Location.find();
            return res.status(200).send({
                message: "Success",
                status: true,
                data: response
            })
        }
        catch (error) {
            return res.status(400).send({
                message: "Error",
                status: false,
                data: error
            })

        }
    }
}



