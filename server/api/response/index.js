'use strict';

var express = require('express');
var controller = require('./response.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.delete('/', controller.destroy)

module.exports = router;
