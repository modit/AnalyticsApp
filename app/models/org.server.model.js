'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Org Schema
 */
var OrgSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Org name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Org', OrgSchema);