const driver_location = require("../controllers/driver_location");
const { verifyToken } = require("../middleware/auth.js");
const router = require('express').Router();

router.post("/driver_location", driver_location.postLocation);
router.get("/driver_location", verifyToken, driver_location.getLocation);
router.get("/ride_location",verifyToken, driver_location.rideLocation)

module.exports = router