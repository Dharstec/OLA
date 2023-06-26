const twilio = require('twilio');
const accountSid = 'ACffd704d837094070829e396cf42ee3e2';
const authToken = 'a5b621e9e45ffc06398972417b34a95a';
const config = require("../config/authConfig");
const client = twilio(accountSid, authToken);
const Ride_Create = require("../models/ride_create")
const Ride_Trans = require("../models/ride_transaction")

const Driver = require("../models/driver")

const verificationCode = Math.floor(100000 + Math.random() * 900000)
const rideSendtoDriver = (phone, code) => {
  return client.messages
      .create({
          body: `You Have a Ride`,
          from: '+12542562304',
          to: phone
      });
}

const  rideAllocationmsgForCustomer = (phone, code) => {
  return client.messages
      .create({
          body: `Driver Alocated`,
          from: '+12542562304',
          to: phone
      });
}


module.exports = {
  singup: async (body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const filter = { phone_no: body.phone_no };
        const update = { $set: { name: body?.name } };
        const options = { upsert: true };
        await Driver.updateOne(filter, update, options);
        resolve("Driver Upsert")
      }
      catch (error) {
        console.log(error)
        return res.status(400).send({
          message: "Error",
          status: false,
          data: error
        })

      }
    })
  },
  singupMobile: async (req, res) => {
    try {
      const URL = process.env.URL

      const { language, phone_no, email, name, city, referral_code, vehicle_type, vehicle_number, bank_account_details, driving_licence_no, aadhar_card_no, rc_book_no, vehicel_insurance_no, pancard_no } = req.body;
      const aadhaarImage = URL + req.files['aadhaar'][0]['filename'];
      const panImage = URL + req.files['pancard'][0]['filename'];
      const profilePictureImage = URL + req.files['profile_picture'][0]['filename'];
      const rcBookImage = URL + req.files['rc_book'][0]['filename'];
      const drivingLicenceImage = URL + req.files['driving_licence'][0]['filename'];
      const VehicelInsuranceImage = URL + req.files['vehicel_insurance'][0]['filename'];
      const filter = { phone_no: phone_no };
      const update = {
        $set: {
          language: language,
          email: email,
          name: name,
          city: city,
          referral_code: referral_code,
          vehicle_type: vehicle_type,
          vehicle_number: vehicle_number,
          bank_account_details: bank_account_details,
          driving_licence_no: driving_licence_no,
          aadhar_card_no: aadhar_card_no,
          rc_book_no: rc_book_no,
          vehicel_insurance_no: vehicel_insurance_no,
          pancard_no: pancard_no,
          profile_picture_img: profilePictureImage,
          driving_licence_img: drivingLicenceImage,
          aadhar_card_img: aadhaarImage,
          rc_book_img: rcBookImage,
          vehicel_insurance_img: VehicelInsuranceImage,
          pancard_img: panImage,
          approval_status: false
        }
      };
      const options = { upsert: true };
      let response = await Driver.updateOne(filter, update, options);
      return res.status(200).send({
        message: "Driver Update Successfully",
        status: true,
        data: response
      })
    }
    catch (error) {
      console.error(error)
      return res.status(400).send({
        message: "Error",
        status: false,
        data: error
      })

    }

  },
  getProfile: async (req, res) => {
    try {
      let datas = await Driver.find({ phone_no: req.phone_no })
      res.status(200).send({
        message: "Success",
        data: datas
      })

    } catch (error) {
      res.status(500).send({
        message: "Failed",
        data: `${error.message || error}`
      })
    }
  },

  rideDetail: async (req, res) => {
    //console.log("MANI")
    code = verificationCode
    //console.log(req.driver.driver_detail.phone_no);
    sympl = "+"
    dph = req.driver.driver_detail.phone_no
    dphon = sympl.concat(dph);
    //await rideSendtoDriver(dphon, code)
    cph = req.ride.customer_no
    cphon = sympl.concat(cph);
    //await rideAllocationmsgForCustomer(cphon,code)
    return true
  },

  driver_response: async(req, res) => {
    r_id = req.body.raid_id
    let ride = await Ride_Create.findOne({id: r_id})
    res_data = await ride.update({ride_status: req.body.status})
    let ride_trans = new Ride_Trans({
      from: ride.from,
      to: ride.to,
      customer_name: ride.customer_name,
      customer_no: ride.customer_no,
      driver_no: ride.driver_no,
      vechile_no: ride.vechile_no,
      vechile_type: ride.vechile_type,
      distance: ride.distance,
      approximate_price: ride.price,
      price: ride.price,
      ride_status: req.body.status,
      paymentmode: ride.paymentmode,
      ride_id: ride.id
  });
    console.log(ride_trans);
     await ride_trans.save()

    res.send(ride)
  },

  currentRide: async(req, res) => {
    curr_tide = await Ride_Create.find({driver_no: req.phone_no })
   res.send(curr_tide)
  },

  startRide: async(req, res)=>{
    curr_tide = await Ride_Create.findOne({id: req.body.raid_id })
    if(curr_tide){
      console.log(curr_tide.code)
      console.log(req.body.code)
      if (curr_tide.code == req.body.code){
        upda = await curr_tide.update({ride_status: "Ride Starting"})
        console.log(curr_tide)
        ride = curr_tide
        let ride_trans = new Ride_Trans({
          from: ride.from,
          to: ride.to,
          customer_name: ride.customer_name,
          customer_no: ride.customer_no,
          driver_no: ride.driver_no,
          vechile_no: ride.vechile_no,
          vechile_type: ride.vechile_type,
          distance: ride.distance,
          approximate_price: ride.price,
          price: ride.price,
          ride_status: "Ride Starting",
          paymentmode: ride.paymentmode,
          ride_id: ride.id
      });
         await ride_trans.save()
        res.send("Ok")
      }
      else{
        res.send("Code Wrong")
      }
    }
    else{
      res.send("Ride Not Avialable")
    }
  },

  completRide: async(req, res)=>{
    curr_tide = await Ride_Create.findOne({id: req.body.raid_id })
    if(curr_tide){
      //if (curr_tide.code == req.body.code){
        upda = await curr_tide.update({ride_status: "Ride Completed", ispayed: true})
        ride = curr_tide
        let ride_trans = new Ride_Trans({
          from: ride.from,
          to: ride.to,
          customer_name: ride.customer_name,
          customer_no: ride.customer_no,
          driver_no: ride.driver_no,
          vechile_no: ride.vechile_no,
          vechile_type: ride.vechile_type,
          distance: ride.distance,
          approximate_price: ride.price,
          price: ride.price,
          ride_status: "Ride Completed",
          paymentmode: ride.paymentmode,
          ride_id: ride.id
      });
         await ride_trans.save()
        res.send("Ok")
      }
      // else{
      //   res.send("Code Wrong")
      // }
    //}
    else{
      res.send("Ride Not Avialable")
    }
    
  }
}



