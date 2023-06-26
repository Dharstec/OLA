const mongoose = require("mongoose");
const ride = new mongoose.Schema(
    {
        from: {
            type: {
                type: String,
                enum: ['Point']
            },
            coordinates: {
                type: [Number],
                required: true
            }
        },
        to: {
            type: {
                type: String,
                enum: ['Point']
            },
            coordinates: {
                type: [Number],
                required: true
            }

        },
        customer_name:String,
        customer_no: String,
        driver_no:String,
        vechile_no:String,
        vechile_type:String,
        ride_status:String,
        distance:String,
        approximate_price: String,
        price:String,
        paymentmode: String,
        ispayed: Boolean,
        code: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("rides", ride);