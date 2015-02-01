var path = require("path");
var assert = require("chai").assert;
var helper = require(path.join(__dirname, "helpers/index.js"));
var client = helper.client;
var Note = helper.Note;

describe("Note Model Index Operations", function () {
	describe(".deleteIndex", function () {
		beforeEach(function(done) {
			Note.createIndex(done);
		});

		it ("deletes an index", function (done) {
			Note.deleteIndex(function (error, result) {
				if (error) return done(error);
				helper.indexExists("notorious", function (error, result) {
					if (error) return done(error);
					assert.isFalse(result);
					done();
				});
			});
		});
	});

	describe(".createIndex", function () {
		afterEach(function (done) {
			Note.deleteIndex(done);
		});

		it ("creates an index", function (done) {
			helper.indexExists("notorious", function (error, result) {
				if (error) return done(error);
				assert.isFalse(result);
				Note.createIndex(function (error, result) {
					if (error) return done(error);
					assert.isTrue(result.acknowledged);
					helper.indexExists("notorious", function (error, result) {
						if (error) return done(error);
						assert.isTrue(result);
						done();
					});
				});
			});
		});
	});

	describe(".createMapping", function () {
		before(function (done) {
			Note.createIndex(done);
		});

		after(function (done) {
			Note.deleteIndex(done);
		});

		it ("creates a mapping", function (done) {
			Note.createMapping(function (error, result) {
				if (error) return done(error);
				assert.isTrue(result.acknowledged);
				client.indices.getMapping({
					index: "notorious",
					type: "note"
				}, function (error, result) {
					if (error) return done(error);
					for (var prop in Note._config.mapping.properties) {
						assert.isDefined(result.notorious.mappings[prop]);
					}
					done();
				})
			});
		});
	});
});