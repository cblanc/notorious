var assert = require("chai").assert;
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

helper.testNote = function (note, savedNote) {
	assert.equal(note.title, savedNote.title);
	assert.equal(note.content, savedNote.content);
	assert.equal(note.tags[0], savedNote.tags[0]);
	assert.equal(note.tags[1], savedNote.tags[1]);
};

module.exports = helper;