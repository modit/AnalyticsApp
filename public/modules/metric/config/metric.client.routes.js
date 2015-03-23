'use strict';

//Setting up route
angular.module('metric').config(['$stateProvider',
	function($stateProvider) {
		// Metric state routing
		$stateProvider.
		state('metric', {
			url: '/apiv1metric',
			templateUrl: 'modules/metric/views/n.client.view.html'
		});
	}
]);