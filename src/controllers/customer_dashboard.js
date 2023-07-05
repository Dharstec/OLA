
const Ride_Create = require("../models/ride_create")
const Ride_Trans = require("../models/ride_transaction")
const Location = require("../models/driver_location")
const assign_driver = require("../controllers/driver")


//console.log(randomNumber);


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

function raid_detail(item) {
    loc = {
        driver_lat: item.location.coordinates[0],
        driver_lon: item.location.coordinates[1]
    }

    return loc
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

    get_driver: async (req, res) =>{
      try{
        console.log(req)
       r_id = req.body.raid_id
        let ride = await Ride_Create.findOne({id: r_id})
        let raid_detail = {
            from_ride: ride.from.coordinates[0],
            to_ride: ride.from.coordinates[1]
        }
        //console.log(ride)
        driver_list = [];
        let response = await Location.find();
        console.log(response.length)
        for (let i = 0; i < response.length; i++) { 
            driver_loc = {
                driv_lat : response[i].location.coordinates[0],
                driv_lon : response[i].location.coordinates[1]
            }
            let distance = getDistanceFromLatLonInKm(driver_loc.driv_lat, driver_loc.driv_lon, raid_detail.from_ride, raid_detail.to_ride)
            //console.log(distance)
            driver_list.push({driver_detail: response[i], distance: distance})
          }
          console.log(driver_list)
          //console.log(Math.min(...driver_list))
         // var min = Math.min(...driver_list.map(item => item.cost));
           aa = driver_list.map(a => a.distance);
           min = Math.min(...aa)
           index = aa.indexOf(min)
        //   console.log(index)
          resp = driver_list[index]
          det = {
            driver: resp,
            ride: ride
          }
          await assign_driver.rideDetail(det)
          console.log(det.driver.driver_detail.phone_no)
          updata = await ride.update({driver_no: det.driver.driver_detail.phone_no, ride_status: "Driver Allocated"})
          
          let ride_trans = new Ride_Trans({
            from: ride.from,
            to: ride.to,
            customer_name: ride.customer_name,
            customer_no: ride.customer_no,
            driver_no: det.driver.driver_detail.phone_no,
            vechile_no: ride.vechile_no,
            vechile_type: ride.vechile_type,
            distance: ride.distance,
            approximate_price: ride.price,
            price: ride.price,
            ride_status: "Driver Allocated",
            paymentmode: ride.paymentmode,
            ride_id: ride.id
        });
          console.log(ride_trans);
           await ride_trans.save()
          res.send(resp);
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
        const randomNumber = Math.floor(Math.random() * 9000) + 1000;
        try {
            num = req.body.customer_no
            console.log(num)
            wating_ride = Ride_Create.find({customer_no: num, ride_status: "Waiting"}, async function(err, users) {
                if (err) {
                    console.error(err);
                    return;
                  }
                if (users.length > 0){
                    return res.status(200).send({
                        message: "Cancel the old Ride",
                        status: true,
                        data: []
                    })
                }
                else{
                    //console.log(randomNumber)
                    let ride_cr = new Ride_Create({
                        from: req.body.from,
                        to: req.body.to,
                        customer_name: req.body.customer_name,
                        customer_no: req.body.customer_no,
                        driver_no: req.body.driver_no,
                        vechile_no: req.body.vechile_no,
                        vechile_type: req.body.vechile_type,
                        distance: req.body.distance,
                        approximate_price: req.body.price,
                        price: req.body.price,
                        ride_status: "Waiting",
                        paymentmode: req.body.paymentmode,
                        code: randomNumber
                    });
                    let response =  await ride_cr.save();

                    let ride_trans = new Ride_Trans({
                        from: req.body.from,
                        to: req.body.to,
                        customer_name: req.body.customer_name,
                        customer_no: req.body.customer_no,
                        driver_no: req.body.driver_no,
                        vechile_no: req.body.vechile_no,
                        vechile_type: req.body.vechile_type,
                        distance: req.body.distance,
                        approximate_price: req.body.price,
                        price: req.body.price,
                        ride_status: "Waiting",
                        paymentmode: req.body.paymentmode,
                        ride_id: response.id
                    });
                    ride_trans.save();


                    console.log(response);
                    return res.status(200).send({
                        message: "Ride Created",
                        status: true,
                        data: response
                    })
        
                    
                }
            }); 
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



