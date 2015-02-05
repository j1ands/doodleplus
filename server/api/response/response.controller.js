'use strict';

var sqldb = require('../../sqldb');
var Response = sqldb.Response;
var Time  = sqldb.Time;

// Gets list of responses from the DB.
exports.index = function(req, res) {
  res.json([]);
};

// associate each time with the correct event id
// bulkCreate responses

exports.create = function(req, res) {
  Response.bulkCreate(req.body.responses)
  	.then(function(responses) {
  		res.status(200).send({responses: responses})
  	})
  	.catch(function(err) {
  		console.log('err', err);
  		res.status(500);
  	})
};