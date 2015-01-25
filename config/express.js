var path = require("path");
var morgan = require("morgan");
var express = require("express");
var bodyParser = require("body-parser");
var hbs = require("express-handlebars");

module.exports = function (app) {
	// Enable logging
	app.use(morgan("combined"));

	// Enable body parser
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }))

	// Public dir
	app.use("/public", express.static(path.join(__dirname, '../public')));

	// Enable template engine
	app.engine("handlebars", hbs({ 
		defaultLayout: "main",
		layoutsDir: path.join(__dirname, "../app/views/layouts")
	}));
	app.set("views", path.join(__dirname, "../app/views"));
	app.set("view engine", "handlebars");
};