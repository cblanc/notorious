"use strict";

var notesController = {};
var path = require("path");
var Note = require(path.join(__dirname, "../models/note.js"));

notesController.get = function (request, response, next) {
	response.format({
		json: function () {
			Note.list(function (error, notes) {
				if (error) return next(error);
				return response.status(200).json({
					notes: notes.map(function (note) { return note._source })});
			});
		},
		default: function () {
			return response.redirect("/");
		}
	})
};

notesController.post = function (request, response, next) {
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
};

module.exports = notesController;