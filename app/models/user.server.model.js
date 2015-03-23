'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	 Schema = mongoose.Schema, 
	 ObjectId    = Schema.Types.ObjectId,
	 crypto = require('crypto'),
	 validator = require('validator');



/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
    return ((this.provider !== 'local' && !this.modified) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
    return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * User Schema
 */


var UserSchema = new Schema({
    superadmin: Boolean,
    auth: {
        type: {
            provider: String,
            id: String,
            email: String,
            name: String,
            provisional: Boolean,
            authorized: {
                github: {
                    username: String,
                    token: String
                }
            },
            verification: String
        }
    },

    //Modit Profile information
    profile: {
        username: {
            type: String,
            index: {
                text: true
            }
        },
        email: {
            type: String,
            index: {
                text: true
            }
        },
        name: {
            type: String,
            index: {
                text: true
            }
        },
        company: {
            type: String,
            index: {
                text: true
            }
        },
        bio: {
            type: String,
            select: false
        },
        url: {
            type: String
        },
        location: {
            type: String
        },
    },
    account: {
        type: ObjectId,
        ref: 'Account',
        select: false
    },
    indexedName: {
        type: String,
       // unique: true,
       // required: true
    }, //unique and always lowercase
    organization: {
        type: Boolean,
        default: false
    }, //is organization

    invites: {
        type: Number,
        default: 0
    },

    modified: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    },

    dismissedMessages: {
        type: [String],
        select: false
    },
    password: {
        type: String,
        default: '',
        validate: [validateLocalStrategyPassword, 'Password should be longer']
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        //required: 'Provider is required'
    },
    providerData: {},
    additionalProvidersData: {},
    roles: {
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        default: ['user']
    },
    /* For reset password */
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
}, {
    toJSON: {
        virtuals: true,
        transform: function(doc, ret, options) {
            ret.$provisional = ret.auth && ret.auth.provisional;
            delete ret.auth; //We don't need/want to accidentally send any oauth data across the wire
            delete ret.GitHubAuthorization;
            return ret;
        }
    }
});

UserSchema.statics.REGEX_USERNAME = /(?:^-|[^a-zA-Z0-9\-])/g;
//UserSchema.statics.REGEX_EMAIL = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; 
UserSchema.statics.REGEX_EMAIL = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[^']*?[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

UserSchema.statics.isEmail = validator.isEmail; //=> true 

// var UserSchema = new Schema({

//     'profile': {
//         'username': 'joe',
//         'email': 'joe@mod.it',
//         'name': 'Joe Admin'
//     },

//     firstName: {
//         type: String,
//         trim: true,
//         default: '',
//         validate: [validateLocalStrategyProperty, 'Please fill in your first name']
//     },
//     lastName: {
//         type: String,
//         trim: true,
//         default: '',
//         validate: [validateLocalStrategyProperty, 'Please fill in your last name']
//     },
//     displayName: {
//         type: String,
//         trim: true
//     },
//     email: {
//         type: String,
//         trim: true,
//         default: '',
//         validate: [validateLocalStrategyProperty, 'Please fill in your email'],
//         match: [/.+\@.+\..+/, 'Please fill a valid email address']
//     },
//     username: {
//         type: String,
//         unique: 'testing error message',
//         required: 'Please fill in a username',
//         trim: true
//     },
//     password: {
//         type: String,
//         default: '',
//         validate: [validateLocalStrategyPassword, 'Password should be longer']
//     },
//     salt: {
//         type: String
//     },
//     provider: {
//         type: String,
//         required: 'Provider is required'
//     },
//     providerData: {},
//     additionalProvidersData: {},
//     roles: {
//         type: [{
//             type: String,
//             enum: ['user', 'admin']
//         }],
//         default: ['user']
//     },
//     updated: {
//         type: Date
//     },
//     created: {
//         type: Date,
//         default: Date.now
//     },
//     /* For reset password */
//     resetPasswordToken: {
//         type: String
//     },
//     resetPasswordExpires: {
//         type: Date
//     }
// });

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
    if (this.password && this.password.length > 6) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }

    next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
    } else {
        return password;
    }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne({
        username: possibleUsername
    }, function(err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};

mongoose.model('User', UserSchema);