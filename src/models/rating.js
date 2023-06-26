const mongoose = require("mongoose");
const rating = new mongoose.Schema(
    {      
        ride_id:String,
        star: Number,
        user:String,
        rating_for: String,
        driver_no:String,
        customer_no: String,
        feed_back:String,
        points:Array,
    },
    { timestamps: true }
);
module.exports = mongoose.model("rating", rating);