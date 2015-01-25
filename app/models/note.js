var path = require("path");
var client = require(path.join(__dirname, "../../config/db.js"));

var config = {
	"index" : "notorious",
	"type" : "note",
	"mapping" : {
		"note" : {
			"_all" : { 
				"enabled" : false
			},
			"properties" : {
				"title": {
					"type" : "string"
				},
				"tags": {
					"type" : "string",
					"index_name": "tag"
				},
				"content": {
					"type" : "string"
				}
			}
		}
	}	
};

function Note (note) {
	if (note.id) {
		this.id = note.id;
	}

	this.title = note.title;
	this.content = note.content;

	if (this.tags && typeof this.tags === "string")
	this.tags = note.tags;
}

Note._config = config;

Note.create = function (note, callback) {

};

Note.delete = function (id, callback) {

};

Note.clearType = function (callback) {

};

Note.createIndex = function (callback) {
	client.indices.create({
		index: config.index
	}, callback);
};

Note.deleteIndex = function (callback) {
	client.indices.delete({
		index: config.index
	}, callback);
};

Note.createMapping = function (callback) {
	client.indices.putMapping({
		index: config.index,
		type: config.type,
		body: config.mapping
	}, callback);
};


module.exports = Note;