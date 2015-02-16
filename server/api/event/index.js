'use strict';

var express = require('express');
var controller = require('./event.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/manage/:admin',controller.findManageEvent);
router.get('/:id',controller.findEvent);

module.exports = router;
