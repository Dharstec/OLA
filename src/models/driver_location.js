const mongoose = require("mongoose");
const driver_location = new mongoose.Schema(
    {
        location: {
            type: {
                type: String,
                enum: ['Point']
            },
            coordinates: {
                type: [Number],
                required: true
            }

        },
        phone_no: Number,
        status:Boolean
    },
    { timestamps: true }

);

module.exports = mongoose.model("driver_location", driver_location);