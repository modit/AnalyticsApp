'use strict';

(function() {
	// Orgs Controller Spec
	describe('Orgs Controller Tests', function() {
		// Initialize global variables
		var OrgsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Orgs controller.
			OrgsController = $controller('OrgsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Org object fetched from XHR', inject(function(Orgs) {
			// Create sample Org using the Orgs service
			var sampleOrg = new Orgs({
				name: 'New Org'
			});

			// Create a sample Orgs array that includes the new Org
			var sampleOrgs = [sampleOrg];

			// Set GET response
			$httpBackend.expectGET('orgs').respond(sampleOrgs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.orgs).toEqualData(sampleOrgs);
		}));

		it('$scope.findOne() should create an array with one Org object fetched from XHR using a orgId URL parameter', inject(function(Orgs) {
			// Define a sample Org object
			var sampleOrg = new Orgs({
				name: 'New Org'
			});

			// Set the URL parameter
			$stateParams.orgId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/orgs\/([0-9a-fA-F]{24})$/).respond(sampleOrg);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.org).toEqualData(sampleOrg);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Orgs) {
			// Create a sample Org object
			var sampleOrgPostData = new Orgs({
				name: 'New Org'
			});

			// Create a sample Org response
			var sampleOrgResponse = new Orgs({
				_id: '525cf20451979dea2c000001',
				name: 'New Org'
			});

			// Fixture mock form input values
			scope.name = 'New Org';

			// Set POST response
			$httpBackend.expectPOST('orgs', sampleOrgPostData).respond(sampleOrgResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Org was created
			expect($location.path()).toBe('/orgs/' + sampleOrgResponse._id);
		}));

		it('$scope.update() should update a valid Org', inject(function(Orgs) {
			// Define a sample Org put data
			var sampleOrgPutData = new Orgs({
				_id: '525cf20451979dea2c000001',
				name: 'New Org'
			});

			// Mock Org in scope
			scope.org = sampleOrgPutData;

			// Set PUT response
			$httpBackend.expectPUT(/orgs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/orgs/' + sampleOrgPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid orgId and remove the Org from the scope', inject(function(Orgs) {
			// Create new Org object
			var sampleOrg = new Orgs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Orgs array and include the Org
			scope.orgs = [sampleOrg];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/orgs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleOrg);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.orgs.length).toBe(0);
		}));
	});
}());