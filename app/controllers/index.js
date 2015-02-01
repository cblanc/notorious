"use strict";

var path = require("path");

var controllers = {};

controllers.notes = require(path.join(__dirname, "./notes.js"));

module.exports = controllers;