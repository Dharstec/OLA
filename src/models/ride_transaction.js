const mongoose = require("mongoose");
const ride_trans = new mongoose.Schema(
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
        customer_no: Number,
        driver_no:Number,
        vechile_no:String,
        vechile_type:String,
        ride_status:String,
        distance:String,
        approximate_price: String,
        price:String,
        paymentmode: String,
        ispayed: Boolean,
        ride_id: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("ride_transaction", ride_trans);