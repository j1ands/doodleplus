'use strict';

var express = require('express');
var controller = require('./response.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.post('/', auth.isRespondee(), controller.create);
router.delete('/', auth.isRespondee(), controller.destroy)

module.exports = router;
