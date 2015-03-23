'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var metrics = require('../../app/controllers/metrics.server.controller');
	var config = require('../../config/env/all');
	// Metrics Routes
	app.route(config.api + '/metric')
		//.get(metrics.list)
		.get(metrics.mock)
		.post(users.requiresLogin, metrics.create);

	app.route(config.api + '/metric/:metricId')
		//.get(metrics.read)
		.get(metrics.mock)
		.put(users.requiresLogin, metrics.hasAuthorization, metrics.update)
		.delete(users.requiresLogin, metrics.hasAuthorization, metrics.delete);

	// Finish by binding the Metric middleware
	app.param('metricId', metrics.metricByID);
};
