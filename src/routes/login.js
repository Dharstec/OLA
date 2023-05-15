const Login = require("../controllers/login");
const router = require('express').Router();


router.post("/customer/login",Login.custoemrlogin);
router.post("/driver/login",Login.driverLogin);

module.exports = router