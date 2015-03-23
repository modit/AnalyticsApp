'use strict';

//Setting up route
angular.module('orgs').config(['$stateProvider',
	function($stateProvider) {
		// Orgs state routing
		$stateProvider.
		state('listOrgs', {
			url: '/orgs',
			templateUrl: 'modules/orgs/views/list-orgs.client.view.html'
		}).
		state('createOrg', {
			url: '/orgs/create',
			templateUrl: 'modules/orgs/views/create-org.client.view.html'
		}).
		state('viewOrg', {
			url: '/orgs/:orgId',
			templateUrl: 'modules/orgs/views/view-org.client.view.html'
		}).
		state('editOrg', {
			url: '/orgs/:orgId/edit',
			templateUrl: 'modules/orgs/views/edit-org.client.view.html'
		});
	}
]);