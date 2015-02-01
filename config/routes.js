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
		.get(function (request, response, next) {
			response.format({
				json: function () {
					Note.list(function (error, notes) {
						if (error) return next(error);
						return response.status(200).json({
							notes: notes.map(function (note) { return note._source })
						});
					});
				},
				default: function () {
					return response.redirect("/");
				}
			})
		})
		.post(function (request, response, next) {
			Note.create({
				title: "New Note",
				content: ""
			}, function (error, result) {
				if (error) return next(error);
				response.format({
					json: function () {
						return response.status(200).json(result);
					},
					default: function () {
						return response.redirect("/");
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