const customer = require("../controllers/customer");
const router = require('express').Router();
const { verifyToken } = require("../middleware/auth.js");

router.post("/profile",verifyToken,customer.singupMobile);
router.get("/profile",verifyToken,customer.getProfile);

module.exports = router