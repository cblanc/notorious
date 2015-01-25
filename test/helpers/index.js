var path = require("path");
var client = require(path.join(__dirname, "../../config/db.js"));
var helper = {};

helper.client = client;
helper.Note = require(path.join(__dirname, "../../app/models/note.js"));

helper.indexExists = function (name, callback) {
	return client.indices.exists({
		index: name
	}, callback);
};

module.exports = helper;