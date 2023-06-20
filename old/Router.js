const Driver = require("./routes/driver");
const Customer = require("./routes/customer");
const Login = require("./routes/login");
const Driver_Location = require("./routes/driver_location");
const CustomerDashboard = require("./routes/customer_dashboard");

module.exports = function (app) {
    app.use("/customer", Customer);
    app.use("/customer", CustomerDashboard);
    app.use("/location", Driver_Location)
    app.use("/driver", Driver);
    app.use("/api", Login);
};