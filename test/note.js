var path = require("path");
var assert = require("chai").assert;
var helper = require(path.join(__dirname, "helpers/index.js"));
var client = helper.client;
var Note = helper.Note;
var note = {
	title: "Note title",
	content: "Note content",
	tags: ["foo", "bar"]
};
Object.freeze(note);

describe("Note Model", function () {
	var _id; 

	before(function (done) {
		helper.setupDb(done);
	});

	after(function (done) {
		helper.teardownDb(done);
	});

	describe(".find_by_id", function () {
		before(function (done) {
			Note.create(note, function (error, result) {
				if (error) return done(error);
				_id = result._id;
				done();
			});
		});

		// after(function (done) {
		// 	Note.delete(_id, done);
		// });

		it ("returns null if note does not exist", function (done) {
			Note.find_by_id("foo", function (error, result) {
				if (error) return done(error);
				assert.isNull(result);
				done();
			});
		});
		it ("returns a note object if note exists", function (done) {
			Note.find_by_id(_id, function (error, savedNote) {
				if (error) return done(error);
				helper.testNote(note, savedNote);
				done();
			});	
		});
	})

	describe(".create", function (done) {
		it ("creates a note", function (done) {
			Note.create(note, function (error, result) {
				if (error) return done(error);
				assert.isTrue(result.created);
				Note.find_by_id(result._id, function (error, savedNote) {
					if (error) return done(error);
					helper.testNote(note, savedNote);
					done();
				});
			});
		});
	});
});