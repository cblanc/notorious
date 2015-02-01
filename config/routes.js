var path = require("path");
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
		.post(function (request, response) {
			Note.create({
				title: "New Note",
				content: ""
			}, function (error, result) {
				if (error) return next(error);
				response.format({
					json: function () {
						response.status(200).json(result);
					},
					default: function () {
						response.redirect("/");
					}
				});
			});
		});
	
	// app.route("/notes/:id")
	// 	.put(function (request, response) {
	// 		Note.find_by_id(request.params.id, function (error, result) {
	// 			if (error) return done(error);

	// 		});
	// 	});

	app.get("/settings", function (request, response) {
		response.render("settings");
	});
};