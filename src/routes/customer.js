const customer = require("../controllers/customer");
const router = require('express').Router();
const { verifyToken } = require("../middleware/auth.js");

router.post("/profile",verifyToken,customer.singupMobile);

module.exports = router