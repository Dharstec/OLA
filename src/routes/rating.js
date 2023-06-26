const Rating = require("../controllers/rating");
const router = require('express').Router();


router.post("/for_customer",Rating.rating_for_customer);
router.post("/for_driver",Rating.rating_for_driver);

router.get("/driver_cumulative", Rating.driver_cumulative);
router.get("/customer_cumulative", Rating.customer_cumulative);


module.exports = router