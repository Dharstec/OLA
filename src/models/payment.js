const mongoose = require("mongoose");
const payment = new mongoose.Schema(
    {      
        from:String,
        to: String,
        price:String,
        price_mode: String,
        driver_no:String,
        customer_no: String
    },
    { timestamps: true }
);
module.exports = mongoose.model("Payment", payment);