'use strict';


var seeds = require('./seeds'),
Q = require('q');

module.exports = function(cb) {

    // here we run bootstrap functions
    Q.fcall(function() {
    	return seeds.plant(function() {
        	console.log('Planting complete');
    	});
    });
    	
    cb('Bootstrapping...');

};
