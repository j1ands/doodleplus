'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var User = require('../sqldb').User;
var Event = require('../sqldb').Event;

// Passport Configuration
require('./google/passport').setup(User, Event, config);

var router = express.Router();

router.use('/google', require('./google'));

module.exports = router;