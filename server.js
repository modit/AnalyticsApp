'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
    config = require('./config/config'),
    mongoose = require('mongoose'),
    chalk = require('chalk'),
    Q = require('q');

/** 
 * Main application entry file.
 * Please note that the order of loading is important.
 */
// var attempt;
// // Bootstrap db connection
// var db = mongoose.connect(config.db, function(err) {
//     if (err) {

//         attempt = attempt || 0;

//         var timeoutSecs = Math.exp(attempt);

//         console.log(chalk.red('ERROR! ' + err));

//         console.log(chalk.red('Retrying in ' + timeoutSecs + 's.'));


//         setTimeout(connect, timeoutSecs * 1000, attempt + 1);

//         //console.error(chalk.red('Could not connect to MongoDB!'));
//         // console.log(chalk.red(err));
//     }

// });

// retries with exponential backoff if connection fails
function connect(attempt, callback) {

    console.log(chalk.green('Connecting to: ' + config.db + ' ...'));

    var db = mongoose.connect(config.db, function(err, res) {

        if (err) {

            attempt = attempt || 0;

            if (attempt <= 5) {
            	
            	var timeoutSecs = Math.exp(attempt);

            	console.log(chalk.red('ERROR! with attempt ' + attempt + ' ' + err));

            	console.log(chalk.red('Retrying in ' + timeoutSecs + 's.'));

            	setTimeout(connect, timeoutSecs * 1000, attempt + 1);
            
            } else {
	            console.error(chalk.red('Could not connect to MongoDB!'));
		        return console.log(chalk.red(err));
            }

            

        } else {
            return callback(db);
        }

    });


}

connect(0, function(db) {

	console.log(chalk.green('DB ' + config.db + ' is connected'));
    // Init the express application
    var app = require('./config/express')(db);

    // Bootstrap passport config
    require('./config/passport')();

    // Start the app by listening on <port>
    app.listen(config.port);

    // Expose app
    exports = module.exports = app;

    // call for bootstrapping
    require('./config/bootstrap')(console.log);

    // Logging initialization
    console.log('Modit Administrator started on port ' + config.port);

});