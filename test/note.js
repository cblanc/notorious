var path = require("path");
var assert = require("chai").assert;
var helper = require(path.join(__dirname, "helpers/index.js"));
var client = helper.client;
var Note = helper.Note;

describe("Note Model", function () {
	before(function (done) {
		helper.setupDb(done);
	});

	after(function (done) {
		helper.teardownDb(done);
	});

	describe("create", function (done) {
		before(function)
		it ("creates a note", function (done) {

		});
	});
});