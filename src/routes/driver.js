const driver = require("../controllers/driver");
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
  
router.post("/singup",uploadData.fields([
{ name: 'aadhaar_img' }, 
{ name: 'pancard_img' },
{ name: 'rc_book_img'},
{name:'profile_picture_img'},
{ name: 'driving_licence_img'},
{ name: 'vehicel_insurance_img'}
]),driver.singupMobile);

module.exports = router