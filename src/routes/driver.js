const driver = require("../controllers/driver");
const { verifyToken } = require("../middleware/auth.js");
const router = require('express').Router();
const multer = require('multer');


const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Not a img File!!"), false);
  }
};
const uploadData = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

router.post("/profile", 
uploadData.fields([
  { name: 'aadhaar', maxCount: 1 },
  { name: 'pancard', maxCount: 1 },
  { name: 'profile_picture', maxCount: 1 },
  { name: 'rc_book', maxCount: 1 },
  { name: 'driving_licence', maxCount: 1 },
  { name: 'vehicel_insurance', maxCount: 1 }
]),verifyToken, 
driver.singupMobile);
router.get("/profile",verifyToken,driver.getProfile);
router.post("/driver_res", verifyToken, driver.driver_response)
router.get("/current_ride", verifyToken, driver.currentRide)
router.post("/start_driver", verifyToken, driver.startRide)
router.post("/complete_driver", verifyToken, driver.completRide)


module.exports = router