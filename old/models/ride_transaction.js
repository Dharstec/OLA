const mongoose = require("mongoose");
const ride_trans = new mongoose.Schema(
    {
        customer_name:String,
        customer_no: Number,
        driver_no:Number,
        vechile_no:String,
        vechile_type:String,
        ride_status:String,
        distance:String,
        price:String
    },
    { timestamps: true }
);

module.exports = mongoose.model("ride_transaction", ride_trans);