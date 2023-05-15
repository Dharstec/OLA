const mongoose = require("mongoose");
const otp = new mongoose.Schema(
    {
        phone_no: {
            type: Number,
            required: [true, "Please enter your phone_no"],
        },
        otp: {
            type: String,
            required: [true, "Please enter your otp"],
        }
    }
);

module.exports = mongoose.model("otp", otp);