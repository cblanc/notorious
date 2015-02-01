var path = require("path");
var helper = require(path.join(__dirname, "helpers/index.js"));
var Note = helper.Note;
var app = helper.app;
var request = require("supertest");
var assert = require("chai").assert;
var note = {
	title: "Note title",
	content: "Note content",
	tags: ["foo", "bar"]
};

describe("/", function () {
	before(function (done) {
		helper.setupDb(done);
	});

	after(function (done) {
		helper.teardownDb(done);
	});

	it ("renders home page", function (done) {
		request(app)
			.get("/")
			.expect(200)
			.end(function (error, response) {
				if (error) return done(error);
				done();
			});
	});
});

describe("Non existant pages", function () {
	describe("HTML", function () {
		it ("returns a 404 if resource does not exist", function (done) {
			request(app)
				.get("/foo")
				.set("Accept", "text/html")
				.expect(404)
				.expect("Content-Type", /html/)
				.end(function(error, result) {
					if (error) return done(error);
					done();
				});
		});
	});
	describe("JSON", function () {
		it ("returns a 404 if resource does not exist", function (done) {
			request(app)
				.get("/foo")
				.set("Accept", "application/json")
				.expect(404)
				.expect("Content-Type", /json/)
				.end(function(error, result) {
					if (error) return done(error);
					done();
				});
		});
	});
});