
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
    console.log(req.files)
    try {
      const aadhaarImage = req.files['aadhaar_img'][0]?.['filename'];
      console.log(aadhaarImage)
//       const panImage = req.files['pancard_img'][0]?.['filename'];
//       const profilePictureImage = req.files['profile_picture_img'][0]?.['filename'];
//       const rcBookImage = req.files['rc_book_img'][0]?.['filename'];
//       const drivingLicenceImage = req.files['driving_licence_img'][0]?.['filename'];
//       const VehicelInsuranceImage = req.files['vehicel_insurance_img'][0]?.['filename'];
// console.log(panImage)
// console.log(profilePictureImage)
// console.log(rcBookImage)
// console.log(drivingLicenceImage)
// console.log(VehicelInsuranceImage)

      // const filter = { phone_no: req.body.phone_no };
      // const update = {
      //   $set: {
      //     language: req?.body?.language,
      //     email: req?.body?.email,
      //     name: req?.body?.name,
      //     city: req?.body?.city,
      //     referral_code: req?.body?.referral_code,
      //     vehicle_type: req?.body?.vehicle_type,
      //     vehicle_number:req.body?.vehicle_number,
      //     bank_account_details: req?.body?.bank_account_details,
      //     driving_licence_no: req?.body?.driving_licence_no,
      //     aadhar_card_no: req?.body?.aadhar_card_no,
      //     rc_book_no: req?.body?.rc_book_no,
      //     vehicel_insurance_no: req?.body?.vehicel_insurance_no,
      //     pancard_no: req?.body?.pancard_no,
      //     profile_picture_img: profilePictureImage,
      //     driving_licence_img: drivingLicenceImage,
      //     aadhar_card_img: aadhaarImage,
      //     rc_book_img: rcBookImage,
      //     vehicel_insurance_img: VehicelInsuranceImage,
      //     pancard_img: panImage,
      //     approval_status: false
      //   }
      // };
      // const options = { upsert: true };
      // let response = await Customer.updateOne(filter, update, options);
      // return res.status(200).send({
      //   message: "Driver Update Successfully",
      //   status: true,
      //   data: response
      // })
    }
    catch (error) {
      console.log(error)
      return res.status(400).send({
        message: "Error",
        status: false,
        data: error
      })

    }

  }
}



