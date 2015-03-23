'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Org = mongoose.model('Org'),
	_ = require('lodash');

/**
 * Create a Org
 */
exports.create = function(req, res) {
	var org = new Org(req.body);
	org.user = req.user;

	org.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(org);
		}
	});
};

/**
 * Show the current Org
 */
exports.read = function(req, res) {
	res.jsonp(req.org);
};

/**
 * Update a Org
 */
exports.update = function(req, res) {
	var org = req.org ;

	org = _.extend(org , req.body);

	org.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(org);
		}
	});
};

/**
 * Delete an Org
 */
exports.delete = function(req, res) {
	var org = req.org ;

	org.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(org);
		}
	});
};

/**
 * List of Orgs
 */
exports.list = function(req, res) { 
	Org.find().sort('-created').populate('user', 'displayName').exec(function(err, orgs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orgs);
		}
	});
};

/**
 * Org middleware
 */
exports.orgByID = function(req, res, next, id) { 
	Org.findById(id).populate('user', 'displayName').exec(function(err, org) {
		if (err) return next(err);
		if (! org) return next(new Error('Failed to load Org ' + id));
		req.org = org ;
		next();
	});
};

/**
 * Org authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.org.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
