'use strict';

// Orgs controller
angular.module('orgs').controller('OrgsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Orgs',
	function($scope, $stateParams, $location, Authentication, Orgs) {
		$scope.authentication = Authentication;

		// Create new Org
		$scope.create = function() {
			// Create new Org object
			var org = new Orgs ({
				name: this.name
			});

			// Redirect after save
			org.$save(function(response) {
				$location.path('orgs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Org
		$scope.remove = function(org) {
			if ( org ) { 
				org.$remove();

				for (var i in $scope.orgs) {
					if ($scope.orgs [i] === org) {
						$scope.orgs.splice(i, 1);
					}
				}
			} else {
				$scope.org.$remove(function() {
					$location.path('orgs');
				});
			}
		};

		// Update existing Org
		$scope.update = function() {
			var org = $scope.org;

			org.$update(function() {
				$location.path('orgs/' + org._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Orgs
		$scope.find = function() {
			$scope.orgs = Orgs.query();
		};

		// Find existing Org
		$scope.findOne = function() {
			$scope.org = Orgs.get({ 
				orgId: $stateParams.orgId
			});
		};
	}
]);