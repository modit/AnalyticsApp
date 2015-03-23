'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Extend user's controller
 */
module.exports = _.extend(
    require('./users/users.authentication.server.controller'),
    require('./users/users.authorization.server.controller'),
    require('./users/users.password.server.controller'),
    require('./users/users.profile.server.controller')
);

module.exports.mock = function(req, res) {
    //console.log('I am a user', req.user);

    // if (req.session.user) {
    //     return res.jsonp(req.session.user);
    // }

    // res.status(403).send('Not Authenticated');
    res.jsonp({'_id':'53ab3d511548ef6e5c999999','created':'2014-06-25T21:21:21.750Z','modified':'2014-07-23T14:24:20.935Z','__v':0,'superadmin':true,'invites':3,'indexedName':'joe','profile':{'username':'joe','email':'joe@mod.it','name':'Test Admin'},'gravatar':'53ab3d511548ef6e5c999999','$owner':true,'isGitHubAuthorized':true,'id':'53ab3d511548ef6e5c999999'});
};

module.exports.mockLogout = function(req, res) {
	req.session.user = null;
	res.redirect(req.param('redirect'));
};

module.exports.mockLogin = function(req, res) {

    req.session.user = {
        '_id': '53ab3d511548ef6e5c999999',
        'created': '2014-06-25T21:21:21.750Z',
        'modified': '2014-07-23T14:24:20.935Z',
        '__v': 0,
        'superadmin': true,
        'invites': 3,
        'indexedName': 'joe',
        'profile': {
            'username': 'joe',
            'email': 'joe@mod.it',
            'name': 'Joe Admin'
        },
        'gravatar': '53ab3d511548ef6e5c999999',
        '$owner': true,
        'isGitHubAuthorized': true,
        'id': '53ab3d511548ef6e5c999999'
    };

    res.redirect(req.param('redirect'));

};