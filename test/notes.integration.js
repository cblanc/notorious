"use strict";

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

describe("/notes", function () {
	before(function (done) {
		helper.setupDb(done);
	});

	after(function (done) {
		helper.teardownDb(done);
	});

	describe("GET", function () {
		var _id;
		before(function (done) {
			Note.create(note, function (error, result) {
				if (error) return done(error);
				_id = result._id;
				Note.refresh(done);
			});
		});

		after(function (done) {
			Note.delete(_id, function (error) {
				if (error) return done(error);
				Note.refresh(done);
			});
		});

		describe("HTML", function () {
			it ("redirects to /", function (done) {
				request(app)
					.get("/notes")
					.set("Accept", "text/html")
					.expect(302)
					.end(function (error, response) {
						if (error) return done(error);
						assert.equal(response.headers.location, "/");
						done();
					});
			});
		});

		describe("JSON", function () {
			it ("returns a list of notes", function (done) {
				request(app)
					.get("/notes")
					.set("Accept", "application/json")
					.expect(200)
					.expect("Content-Type", /json/)
					.end(function (error, response) {
						if (error) return done(error);
						var notes = response.body.notes;
						assert.isArray(notes);
						assert.equal(notes.length, 1);
						done();
					});
			});
		});
	});

	describe("POST", function () {
		describe("HTML", function () {
			it ("creates a note", function (done) {
				Note.count(function (error, count) {
					if (error) return done(error);
					request(app)
						.post("/notes")
						.set("Accept", "text/html")
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

		describe("JSON", function () {
			it ("creates a note", function (done) {
				Note.count(function (error, count) {
					if (error) return done(error);
					request(app)
						.post("/notes")
						.set('Accept', 'application/json')
						.send(note)
						.expect(200)
						.expect("Content-Type", /json/)
						.end(function (error, response) {
							if (error) return done(error);
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
	});
});

describe("/notes/:id", function () {
	before(function (done) {
		helper.setupDb(done);
	});

	after(function (done) {
		helper.teardownDb(done);
	});

	describe("GET", function () {
		var _id;
		
		before(function (done) {
			Note.create(note, function (error, result) {
				if (error) return done(error);
				_id = result._id;
				Note.refresh(done);
			});
		});

		after(function (done) {
			Note.delete(_id, function (error) {
				if (error) return done(error);
				Note.refresh(done);
			});
		});

		describe("HTML", function () {
			it ("redirects to /", function (done) {
				request(app)
					.get("/notes/" + _id)
					.set("Accept", "text/html")
					.expect(302)
					.end(function (error, response) {
						if (error) return done(error);
						done();
					});
			});
		});

		describe("JSON", function () {
			it ("returns a note", function (done) {
				request(app)
					.get("/notes/" + _id)
					.set("Accept", "application/json")
					.expect(200)
					.expect("Content-Type", /json/)
					.end(function (error, response) {
						if (error) return done(error);
						var newNote = response.body;
						assert.equal(note.title, newNote.title);
						assert.equal(note.content, newNote.content);
						done();
					});
			});
			it ("returns 404 if note does not exist");	
		});
	});

	describe("PUT", function () {
		var _id;
		
		before(function (done) {
			Note.create(note, function (error, result) {
				if (error) return done(error);
				_id = result._id;
				Note.refresh(done);
			});
		});

		after(function (done) {
			Note.delete(_id, function (error) {
				if (error) return done(error);
				Note.refresh(done);
			});
		});

		describe("HTML", function () {
			it ("updates a note");
		});

		describe("JSON", function () {
			it ("updates a note");
		});
	});
});
