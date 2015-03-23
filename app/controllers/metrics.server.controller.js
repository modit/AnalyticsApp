'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Metric = mongoose.model('Metric'),
    validator = require('validator'),
    moment = require('moment'),
    _ = require('lodash'),
    Q = require('q');

exports.mock = function(req, res) {
 
    var valid = ['User', 'Project'],
        type = req.param('type').charAt(0).toUpperCase() + req.param('type').slice(1); // capitalize
    if (!validator.isIn(type, valid)) {
        return res.status(400).send('Invalid model entry');
    }

    var Model = require('mongoose').model(type);

    var promises = [],
        start = parseInt(((validator.isNumeric(req.param('start'))) ? req.param('start') : Date.parse(req.param('start')))),
        end = parseInt(((validator.isNumeric(req.param('end'))) ? req.param('end') : Date.parse(req.param('end')))),
        days = Math.floor((end - start) / (60 * 60 * 24 * 1000)) + 1;

    promises.push(Model.find({
        created: {
            $lt: start
        }
    }).exec());
    promises.push(Model.find({
        created: {
            $gte: start,
            $lt: end
        }
    }).exec());

    var dateKey = function(date) {

        var d = new Date(date);
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        var curr_year = d.getFullYear();
        return curr_date + '-' + curr_month + '-' + curr_year;
    };

    Q.spread(promises, function(all, selected) {
        
        var results = [],
        total = all.length,
        reduced = _.map(_.pluck(selected, 'created'), function(create) {
            return dateKey(create);
        }),
        counts = {};

        reduced.forEach(function(day) {
            if (!counts[day]) {
                counts[day] = 1;
            } else {
                counts[day] += 1;
            }
        });       
        
        // now we have the days
        for (var i = 0; i < days; i++) {
            var day = {};

            day.date = (parseInt(start) + (60 * 60 * 24 * 1000 * i));

            var count = counts[dateKey(day.date)] || 0;

            day.new = count;
            // for current compatibility
            day.deleted = 0;
            day.total = total += count;
            results.push(day);
        }
        res.jsonp(results);
    });



    // var types = {};
    // 	types.project = 2000;
    // 	types.org = 100;
    // 	types.user = 1000;

    // 	var total = types[req.param('type')] || 500, //why not
    // 	max = total/10,
    // 	results = [],

    // 	sTart = parseInt(req.param('start')),
    // 	eNd = parseInt(req.param('end')),
    // 	limit = req.param('limit') || false,
    // 	skip = req.param('skip') || false,
    // 	dAys = Math.floor((eNd - sTart) / (60 * 60 * 24 * 1000)) + 1;



    // 	for (var i = 0; i < dAys; i++) {

    // 		var rand = _.random(0, max),
    // 		deleted = _.random(0, max / 10);

    // 		total += (rand - deleted);

    // 		var dAy = {};

    // 		dAy.date = sTart +  (60 * 60 * 24 * 1000 * i);
    // 		dAy.new = rand;
    // 		dAy.deleted = deleted;
    // 		dAy.total = total;
    // 		results.push(dAy);
    // 	}

    //  //	console.log(results);

    // 	res.jsonp(results);

};

/**
 * Create a Metric
 */
exports.create = function(req, res) {
    var metric = new Metric(req.body);
    metric.user = req.user;

    metric.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(metric);
        }
    });
};

/**
 * Show the current Metric
 */
exports.read = function(req, res) {
    res.jsonp(req.metric);
};

/**
 * Update a Metric
 */
exports.update = function(req, res) {
    var metric = req.metric;

    metric = _.extend(metric, req.body);

    metric.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(metric);
        }
    });
};

/**
 * Delete an Metric
 */
exports.delete = function(req, res) {
    var metric = req.metric;

    metric.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(metric);
        }
    });
};

/**
 * List of Metrics
 */
exports.list = function(req, res) {
    Metric.find().sort('-created').populate('user', 'displayName').exec(function(err, metrics) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(metrics);
        }
    });
};

/**
 * Metric middleware
 */
exports.metricByID = function(req, res, next, id) {
    Metric.findById(id).populate('user', 'displayName').exec(function(err, metric) {
        if (err) return next(err);
        if (!metric) return next(new Error('Failed to load Metric ' + id));
        req.metric = metric;
        next();
    });
};

/**
 * Metric authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.metric.user.id !== req.user.id) {
        return res.status(403).send('User is not authorized');
    }
    next();
};