'use strict';

//Orgs service used to communicate Orgs REST endpoints
angular.module('orgs').factory('Orgs', ['$resource',
	function($resource) {
		return $resource('orgs/:orgId', { orgId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);