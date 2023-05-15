
const Driver = require("../models/driver")

module.exports = {
  singup: async (body) => {
    try {
      const filter = { phone_no: body.phone_no };
      const update = { $set: { name: body?.name } };
      const options = { upsert: true };
      await Driver.updateOne(filter, update, options);
      resolve("Driver Upsert")
    }
    catch (error) {
      return res.status(400).send({
        message: "Error",
        status: false,
        data: error
      })

    }
  },
  singupMobile: async (req, res) => {
    try {
      const aadhaarImage = req.files['aadhaar_img'][0]['filename'];
      const panImage = req.files['pancard_img'][0]['filename'];
      const profilePictureImage = req.files['profile_picture_img'][0]['filename'];
      const rcBookImage = req.files['rc_book_img'][0]['filename'];
      const drivingLicenceImage = req.files['driving_licence_img'][0]['filename'];
      const VehicelInsuranceImage = req.files['vehicel_insurance_img'][0]['filename'];

      const filter = { phone_no: req.body.phone_no };
      const update = {
        $set: {
          language: req?.body?.language,
          email: req?.body?.email,
          name: req?.body?.name,
          city: req?.body?.city,
          referral_code: req?.body?.referral_code,
          vehicle_type: req?.body?.vehicle_type,
          bank_account_details: req?.body?.bank_account_details,
          driving_licence_no: req?.body?.driving_licence_no,
          driving_licence_img: drivingLicenceImage,
          profile_picture_no: req?.body?.profile_picture_no,
          profile_picture_img: profilePictureImage,
          aadhar_card_no: req?.body?.aadhar_card_no,
          aadhar_card_img: aadhaarImage,
          rc_book_no: req?.body?.rc_book_no,
          rc_book_img: rcBookImage,
          vehicel_insurance_no: req?.body?.vehicel_insurance_no,
          vehicel_insurance_img: VehicelInsuranceImage,
          pancard_no: req?.body?.pancard_no,
          pancard_img: panImage,
          approval_status: false
        }
      };
      const options = { upsert: true };
      let response = await Customer.updateOne(filter, update, options);
      return res.status(200).send({
        message: "Driver Update Successfully",
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



