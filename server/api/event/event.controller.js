'use strict';

var Event = require('./event.model');
// Gets list of events from the DB.
exports.index = function(req, res) {
  res.json([]);
};

exports.create = function(req, res) {
	console.log(req.body);
	res.send(200, req.body);
}
