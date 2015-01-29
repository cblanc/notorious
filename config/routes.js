var path = require("path");
var Note = require(path.join(__dirname, "../app/models/note.js"));

module.exports = function (app, config, next) {
	app.get("/", function (request, response) {
		Note.list(function (error, notes) {
			if (error) return next(error);
			console.log(notes);
			response.render("home", {
				notes: notes
			});
		});
	});

	app.route("/notes")
		.post(function (request, response, next) {
			Note.create({
				title: "New Note",
				content: ""
			}, function (error, result) {
				if (error) return next(error);
				response.redirect("/");
			});
		});

	app.get("/settings", function (request, response) {
		response.render("settings");
	});
};