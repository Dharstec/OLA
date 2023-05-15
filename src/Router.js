const Driver = require("./routes/driver");
const Customer = require("./routes/customer");
const Login = require("./routes/login");

module.exports = function (app) {
    app.use("/customer", Customer);
    app.use("/driver", Driver);
    app.use("/api", Login);

};