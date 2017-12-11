var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./users.js');
var Notes = require('./notes.js');

// set up a mongoose model and pass it using module.exports
/*module.exports = mongoose.model('NoteBooks', new Schema({
	title: String,
	notes: [Notes],
	autor: [User]
}));*/
module.exports = mongoose.model('NoteBooks', new Schema({
	title: String,
	notes: [Notes],
	autor: Schema.ObjectId
}));
