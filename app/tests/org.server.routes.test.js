'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Org = mongoose.model('Org'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, org;

/**
 * Org routes tests
 */
describe('Org CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Org
		user.save(function() {
			org = {
				name: 'Org Name'
			};

			done();
		});
	});

	it('should be able to save Org instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Org
				agent.post('/orgs')
					.send(org)
					.expect(200)
					.end(function(orgSaveErr, orgSaveRes) {
						// Handle Org save error
						if (orgSaveErr) done(orgSaveErr);

						// Get a list of Orgs
						agent.get('/orgs')
							.end(function(orgsGetErr, orgsGetRes) {
								// Handle Org save error
								if (orgsGetErr) done(orgsGetErr);

								// Get Orgs list
								var orgs = orgsGetRes.body;

								// Set assertions
								(orgs[0].user._id).should.equal(userId);
								(orgs[0].name).should.match('Org Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Org instance if not logged in', function(done) {
		agent.post('/orgs')
			.send(org)
			.expect(401)
			.end(function(orgSaveErr, orgSaveRes) {
				// Call the assertion callback
				done(orgSaveErr);
			});
	});

	it('should not be able to save Org instance if no name is provided', function(done) {
		// Invalidate name field
		org.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Org
				agent.post('/orgs')
					.send(org)
					.expect(400)
					.end(function(orgSaveErr, orgSaveRes) {
						// Set message assertion
						(orgSaveRes.body.message).should.match('Please fill Org name');
						
						// Handle Org save error
						done(orgSaveErr);
					});
			});
	});

	it('should be able to update Org instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Org
				agent.post('/orgs')
					.send(org)
					.expect(200)
					.end(function(orgSaveErr, orgSaveRes) {
						// Handle Org save error
						if (orgSaveErr) done(orgSaveErr);

						// Update Org name
						org.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Org
						agent.put('/orgs/' + orgSaveRes.body._id)
							.send(org)
							.expect(200)
							.end(function(orgUpdateErr, orgUpdateRes) {
								// Handle Org update error
								if (orgUpdateErr) done(orgUpdateErr);

								// Set assertions
								(orgUpdateRes.body._id).should.equal(orgSaveRes.body._id);
								(orgUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Orgs if not signed in', function(done) {
		// Create new Org model instance
		var orgObj = new Org(org);

		// Save the Org
		orgObj.save(function() {
			// Request Orgs
			request(app).get('/orgs')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Org if not signed in', function(done) {
		// Create new Org model instance
		var orgObj = new Org(org);

		// Save the Org
		orgObj.save(function() {
			request(app).get('/orgs/' + orgObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', org.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Org instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Org
				agent.post('/orgs')
					.send(org)
					.expect(200)
					.end(function(orgSaveErr, orgSaveRes) {
						// Handle Org save error
						if (orgSaveErr) done(orgSaveErr);

						// Delete existing Org
						agent.delete('/orgs/' + orgSaveRes.body._id)
							.send(org)
							.expect(200)
							.end(function(orgDeleteErr, orgDeleteRes) {
								// Handle Org error error
								if (orgDeleteErr) done(orgDeleteErr);

								// Set assertions
								(orgDeleteRes.body._id).should.equal(orgSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Org instance if not signed in', function(done) {
		// Set Org user 
		org.user = user;

		// Create new Org model instance
		var orgObj = new Org(org);

		// Save the Org
		orgObj.save(function() {
			// Try deleting Org
			request(app).delete('/orgs/' + orgObj._id)
			.expect(401)
			.end(function(orgDeleteErr, orgDeleteRes) {
				// Set message assertion
				(orgDeleteRes.body.message).should.match('User is not logged in');

				// Handle Org error error
				done(orgDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Org.remove().exec();
		done();
	});
});