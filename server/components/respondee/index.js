 'use strict';

 var express = require('express');
 var controller = require('./respondee.controller');
 var auth = require('../../auth/auth.service');

 var router = express.Router();

 router.post('/', controller.createRespondee);
 router.get('/:id', function(req, res, next) {
	 console.log("hey");
	 console.log(req.params);
	 next();
 }, auth.isRespondee(), controller.getRespondee);

 module.exports = router;
