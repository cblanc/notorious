var async = require("async");
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

	describe(".delete", function () {
		before(function (done) {
			Note.create(note, function (error, note) {
				if (error) return done(error);
				_id = note._id;
				done();
			});
		});

		it ("deletes a note", function (done) {
			Note.delete(_id, function (error, result) {
				if (error) return done(error);
				Note.find_by_id(_id, function (error, result) {
					if (error) return done(error);
					assert.isNull(result);
					done();
				});
			});
		});
	});

	describe(".count", function () {
		before(function (done) {
			Note.create(note, function (error, result) {
				if (error) return done(error);
				_id = result._id;
				Note.refresh(done);
			});
		});

		after(function (done) {
			Note.delete(_id, done);
		});

		it ("returns number of documents for note type", function (done) {
			Note.count(function (error, result) {
				if (error) return done(error);
				assert.equal(result, 1);
				done();
			});
		});
	});

	describe(".find_by_id", function () {
		before(function (done) {
			Note.create(note, function (error, result) {
				if (error) return done(error);
				_id = result._id;
				done();
			});
		});

		after(function (done) {
			Note.delete(_id, done);
		});

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

	describe(".clearIndex", function () {
		it ("clears the index", function (done) {
			Note.create({
				title: "Foo",
				content: "Bar"
			}, function (error, result) {
				if (error) return done(error);
				Note.clearIndex(function (error, result) {
					if (error) return done(error);
					client.count({
						index: "notorious",
						type: "note"
					}, function (error, result) {
						if (error) return done(error);
						assert.equal(result.count, 0);
						done();
					});
				});
			})
		});
	});

	describe(".list", function () {
		var notes = [1,2,3];
		notes = notes.map(function (elem) {
			return function (callback) {
				Note.create({
					title: elem.toString(),
					content: (elem * 1000).toString()
				}, callback)
			};
		});
		before(function (done) {
			async.parallel(notes, function (error) {
				if (error) return done(error);
				Note.refresh(done);
			});
		});
		after(function (done) {
			Note.clearIndex(done);
		});
		it ("returns all current notes", function (done) {
			setTimeout(function () {
				Note.list(function (error, result) {
					if (error) return done(error);
					assert.equal(result.length, 3);
					done();
				});
			}, 1000)
		});
	});
});