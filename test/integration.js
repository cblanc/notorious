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

describe("/note", function () {
	before(function (done) {
		helper.setupDb(done);
	});

	after(function (done) {
		helper.teardownDb(done);
	});

	it ("creates a note", function (done) {
		Note.count(function (error, count) {
			if (error) return done(error);
			request(app)
				.post("/notes")
				.send(note)
				.expect(302)
				.end(function (error, response) {
					if (error) return done(error);
					assert.equal(response.headers.location, "/");
					Note.refresh(function (error) {
						if (error) return done(error);
						Note.count(function (error, newCount) {
							if (error) return done(error);
							assert.equal(count + 1, newCount);
							done();
						});
					});
				});
		});
	});
});