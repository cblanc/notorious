var path = require("path");
var helper = path.join(__dirname, "helpers/index.js");
var Note = helper.Note;
var app = helper.app;
var request = require("supertest");
var assert = require("chai").assert;

describe("/", function () {
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