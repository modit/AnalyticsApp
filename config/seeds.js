'use strict';

var async = require('async'),
    UserModel = require('mongoose').model('User'),
    config = require('./config'),
    chance = new require('chance')(),
    Q = require('q'),
    //Thread = require('webworker-threads').Worker,
    Fiber = require('fibers');


/*
 * Seeding based on DB Select the last month. And create a random set
 * of users ors and project during time frame.
 *
 */
var seeds = [
    // users
    function(cb) {
        // reject if there isn't a user seed
        if (!config.seeds ||
            !config.seeds.user ||
            !config.seeds.user.seed) {
            return cb();
        }

        var seedCount = config.seeds.user.seed;

        var plant = function(cb) {
            var users = [];

            var progress = '[          ]',
                title = 'Users Seeding...';

            async.times(seedCount, function(id, next) {

                Q.fcall(function() {
                    return UserModel.create({
                        created: new Date(chance.date({
                            year: 2015
                        })).toISOString(),
                        // modified: '2014-07-23T14:24:20.935Z',
                        superadmin: chance.bool(),
                        invites: chance.integer({
                            min: 0,
                            max: 10
                        }),
                        indexedName: chance.twitter(),
                        provider: chance.pick(['local', 'facebook', 'google', 'github']),
                        profile: {
                            username: chance.string({
                                length: 10
                            }),
                            email: chance.email(),
                            name: chance.name({
                                gender: chance.gender()
                            })
                        },
                        password: chance.string({
                            length: 10
                        }),
                        gravatar: '53ab3d511548ef6e5c999999',
                        $owner: chance.bool(),
                        isGitHubAuthorized: true,
                        id: chance.fbid()
                    }, function(err, user) {
                        if (err) {
                            console.log(err);
                        }
                        return user;

                    });
                }).then(function(user) {

                    try {

                        if ((((id / seedCount) * 100) % 10) === 0) {
                            progress = progress.replace(' ', '=');
                            process.stdout.write('\x1B[0G' + title + progress);
                        }


                    } catch (e) {
                        console.error(e);
                    }

                    next(null, user);
                });
            }, cb);


        };

        UserModel.find({}).exec(function(err, collection) {
            console.log('Our current users', collection.length);
            if (collection.length === 0) {
                new Fiber(function() {                    
                    plant(function(err, users) {
                        console.log('Seeding Complete');
                    });
                }).run();

            }
            cb();
        });



    },
    // orgs
    function(cb) {

    },
    // projects
    function(cb) {

    },


];


module.exports.plant = function(cb) {
    async.series(seeds, cb);
};