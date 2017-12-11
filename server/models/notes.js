var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./users.js');

/*
 * autor - user/autor
 * shared - users who can see note
 * rights - 0-read/ 1-write
 */

// module.export = mongoose.model('Notes', new Schema({
// 	title: String,
// 	content: String,
// 	date: Date,
// 	autor: [User],
// 	access: [User],
// 	rights: Number
// }));
module.export = mongoose.model('Notes', new Schema({
	title: String,
	content: String,
	date: Date,
	autor: Schema.ObjectId,
	access: [Schema.ObjectId],
	rights: Number
}));