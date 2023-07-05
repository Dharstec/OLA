const Ride_Create = require("../models/ride_create")
const Location = require("../models/driver_location");
//const driver_location = require("../models/driver_location");


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
    },
    rideLocation: async(req, res) => {
        try{
        r_id = req.body.raid_id
        let ride = await Ride_Create.findOne({id: r_id})
        let raid_detail = {
            from_ride_lat: ride.from.coordinates[0],
            from_ride_lon: ride.from.coordinates[1],
            to_ride_lat: ride.to.coordinates[0],
            to_ride_lon: ride.to.coordinates[1]
        }
        ph = ride.driver_no
        driver_location = await Location.findOne({phone_no: ph})
        loc = driver_location.location
        res.send({customer: raid_detail, driver: loc, status: ride.ride_status })
    }
    catch(error){
        return res.status(400).send({
            message: "Error",
            status: false,
            data: error
        })
    }
    }

}



