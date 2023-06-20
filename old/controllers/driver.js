
const Driver = require("../models/driver")

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
  }
}



