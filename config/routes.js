module.exports = function (app, config) {
	app.get("/", function (request, response) {
		response.render("home", {
			notes: [{id: "1",title: "Note 1"}, {id: "2",title: "Note 2"}, {id: "3",title: "Note 3"}]
		});
	});

	app.get("/settings", function (request, response) {
		response.render("settings");
	});
};