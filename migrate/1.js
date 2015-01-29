var path = require("path");
var Note = require(path.join(__dirname, "../app/models/note.js"));

module.exports = {
	up: Note.createMapping,
	down: function (callback) {
		callback();
	}
};