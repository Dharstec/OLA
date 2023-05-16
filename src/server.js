const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path')
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


require("./Router")(app);

module.exports = app;
