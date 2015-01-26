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

	describe(".find_by_id", function () {
		it ("returns a note object if note exists");
		it ("returns null if note does not exist");
	})

	describe(".create", function (done) {
		var note = {
			title: "Note title",
			content: "Note content",
			tags: ["foo", "bar"]
		}

		it ("creates a note", function (done) {
			Note.create(note, function (error, result) {
				if (error) return done(error);
				assert.isTrue(result.created);
				Note.find_by_id(result._id, function (error, savedNote) {
					if (error) return done(error);
					assert.equal(note.title, savedNote.title);
					assert.equal(note.content, savedNote.content);
					assert.equal(note.tags[0], savedNote.tags[0]);
					assert.equal(note.tags[1], savedNote.tags[1]);
					done();
				});
			});
		});
	});
});