const customer = require("../controllers/customer_dashboard");
const router = require('express').Router();
const { verifyToken } = require("../middleware/auth.js");

router.post("/dashboard",verifyToken,customer.getditance);
router.post("/find_ride",verifyToken,customer.ride_create);

module.exports = router