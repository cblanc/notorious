var express = require("express");
var app = express();
var path = require("path");
var config = require(path.join(__dirname, "config/config.js"));

// Configure App
require(path.join(__dirname, "config/express.js"))(app, config);

// Configure Routes
require(path.join(__dirname, "config/routes.js"))(app, config);

app.listen(config.port);

console.log("Listening on port", config.port);

module.exports = app;