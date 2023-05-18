const mongoose = require("mongoose");
const otp = new mongoose.Schema(
    {
        location : { type: "Point", coordinates: [ -76.703347, 30.710459 ] },
    }
);

module.exports = mongoose.model("otp", otp);