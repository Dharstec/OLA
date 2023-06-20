
const Ride_Create = require("../models/ride_create")
const Ride_Trans = require("../models/ride_transaction")

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}
module.exports = {
    getditance: async (req, res) => {
        try {
            let latLong = {
                fromlat: req.body.from.lat,
                fromlong: req.body.from.long,
                tolat: req.body.to.lat,
                tolong: req.body.to.long
            }
            let distance = getDistanceFromLatLonInKm(latLong.fromlat, latLong.fromlong, latLong.tolat, latLong.tolong)
            let response = {
                distance: distance.toFixed(2),
                bike_price: Math.round(distance * 10),
                car_price: Math.round(distance * 20)
            }
            res.status(200).send({
                message: "Success",
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
    ride_create: async (req, res) => {
        try {
            let ride_cr = new Ride_Create({
                from: req.body.from,
                to: req.body.to,
                customer_name: req.body.customer_name,
                customer_no: req.body.customer_no,
                driver_no: req.body.driver_no,
                vechile_no: req.body.vechile_no,
                vechile_type: req.body.vechile_type,
                distance: req.body.distance,
                price: req.body.price,
                ride_status: "Waiting"
            });
            let ride_trans = new Ride_Trans({
                from: req.body.from,
                to: req.body.to,
                customer_name: req.body.customer_name,
                customer_no: req.body.customer_no,
                driver_no: req.body.driver_no,
                vechile_no: req.body.vechile_no,
                vechile_type: req.body.vechile_type,
                distance: req.body.distance,
                price: req.body.price,
                ride_status: "Waiting"
            });
            let response = await ride_cr.save();
            ride_trans.save();
            // console.log("createCoupon", createCoupon);
            return res.status(200).send({
                message: "Ride Created",
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



