const mongoose = require("mongoose");
const driver = new mongoose.Schema(
    {
        language: String,
        phone_no: {
            type: Number,
            required: [true, "Please enter your phone_no"],
            unique: true
        },
        email: String,
        name: String,
        city: String,
        referral_code: String,
        vehicle_type: String,
        vehicle_number: String,
        bank_account_details: String,
        driving_licence_no:String,
        driving_licence_img: String,
        profile_picture_no:String,
        profile_picture_img: String,
        aadhar_card_no:String,
        aadhar_card_img: String,
        rc_book_no:String,
        rc_book_img: String,
        vehicel_insurance_no:String,
        vehicel_insurance_img: String,
        pancard_no:String,
        pancard_img:String,
        approval_status:Boolean
    },
    { timestamps: true }
);

module.exports = mongoose.model("driver", driver);