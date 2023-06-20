const mongoose = require("mongoose");
const customer = new mongoose.Schema(
    {
        phone_no: {
            type: Number,
            required: [true, "Please enter your phone_no"],
            unique: true
        },
        email: String,
        name: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("customer", customer);