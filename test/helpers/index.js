var async = require("async");
var path = require("path");
var client = require(path.join(__dirname, "../../config/db.js"));
var helper = {};
var Note;

helper.client = client;
helper.Note = Note = require(path.join(__dirname, "../../app/models/note.js"));

helper.indexExists = function (name, callback) {
	return client.indices.exists({
		index: name
	}, callback);
};

helper.setupDb = function (callback) {
	var operations = [
		Note.createIndex,
		Note.createMapping
	];
	async.series(operations, callback);
};

helper.teardownDb = function (callback) {
	var operations = [
		Note.deleteIndex
	];
	async.series(operations, callback);
};

module.exports = helper;