'use strict';

angular.module('modit.admin').constant('');



angular.module('modit.config', [])
	.constant('templateBaseUrl', 'app/templates/')
	.constant('imageBaseURL', 'app/common/core/assets/')


	.factory('Plural', ['$window', function($window) {
		return $window.pluralize;
	}]);