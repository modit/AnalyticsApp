'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var orgs = require('../../app/controllers/orgs.server.controller');

	// Orgs Routes
	app.route('/orgs')
		.get(orgs.list)
		.post(users.requiresLogin, orgs.create);

	app.route('/orgs/:orgId')
		.get(orgs.read)
		.put(users.requiresLogin, orgs.hasAuthorization, orgs.update)
		.delete(users.requiresLogin, orgs.hasAuthorization, orgs.delete);

	// Finish by binding the Org middleware
	app.param('orgId', orgs.orgByID);
};
