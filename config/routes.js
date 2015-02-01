"use strict";

var path = require("path");
var controllers = require(path.join(__dirname, "../app/controllers/index.js"));
var Note = require(path.join(__dirname, "../app/models/note.js"));

module.exports = function (app, config) {
	app.get("/", function (request, response, next) {
		Note.list(function (error, notes) {
			if (error) console.log(error);
			if (error) return next(error);
			response.render("home", {
				notes: notes
			});
		});
	});

	app.route("/notes")
		.get(controllers.notes.index)
		.post(controllers.notes.post);
	
	app.route("/notes/:id")
		.get(controllers.notes.get);
	// 	.put(function (request, response) {
	// 		Note.find_by_id(request.params.id, function (error, result) {
	// 			if (error) return done(error);

	// 		});
	// 	});

	app.get("/settings", function (request, response) {
		response.render("settings");
	});
};