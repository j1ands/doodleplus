 'use strict';

 var express = require('express');
 var controller = require('./respondee.controller');
 var auth = require('../../auth/auth.service');

 var router = express.Router();

 router.post('/', controller.createRespondee);
 router.get('/', auth.isRespondee(), controller.getRespondee);

 module.exports = router;