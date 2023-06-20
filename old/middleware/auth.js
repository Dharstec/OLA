const jwt = require("jsonwebtoken");
const config = require("../config/authConfig");

exports.verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.flag = decoded.flag;
    req.phone_no = decoded.phone_no;
    next();
  });
};

