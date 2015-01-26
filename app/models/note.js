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
		this._id = note._id;
	}

	this.title = note.title;
	this.content = note.content;
	this.tags = note.tags;
}

Note._config = config;

Note.create = function (note, callback) {
	client.index({
		index: config.index,
		type: config.type,
		body: {
			title: note.title,
			content: note.content,
			tags: note.tags
		}
	}, callback);
};

Note.delete = function (id, callback) {

};

Note.find_by_id = function (_id, callback) {
	client.get({
		index: config.index,
		type: config.type,
		id: _id
	}, function (error, result) {
		if (error) return callback(error);
		if (result.found) {
			var note = result._source;
			note._id = _id;
			return callback(null, new Note(note));
		} else {
			return callback(null, null);
		}
	});
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