const payment = require("../controllers/payment");
const { verifyToken } = require("../middleware/auth.js");
const router = require('express').Router();


router.get("/list",verifyToken,payment.getPayment);
router.post("/list", verifyToken, payment.postPayment)

module.exports = router