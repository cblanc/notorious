var path = require("path");
var config = require(path.join(__dirname, "/config.js"));
var elasticsearch = require("elasticsearch");

var client = new elasticsearch.Client(config.elasticsearch);

module.exports = client;