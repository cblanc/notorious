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

	app.get("/settings", function (request, response) {
		response.render("settings");
	});

	app.route("/notes")
		.get(controllers.notes.index)
		.post(controllers.notes.post);
	
	app.route("/notes/:id")
		.get(controllers.notes.get)
		.put(controllers.notes.put);

	// Page not found
	app.use(function (request, response, next) {
		response.format({
			default: function () {
				response.status(404).render("404");
			},
			json: function () {
				response.status(404).json({
					code: 404,
					error: "Page not found"
				});
			}
		})
	});
};