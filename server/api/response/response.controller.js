'use strict';

var bluebird = require('bluebird');
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


exports.destroy = function(req, res) {
	var responses = req.query.responses;
	if (responses) {
		if (typeof responses === Array) {
			var destroyArr = [];
			responses.forEach(function(response) {
				destroyArr.push(response._id)
			});
			Response.destroy({where: {id: {in: destroyArr}}})
				.then(function() {
					res.status(200).send();
				})
				.catch(function(err) {
					res.status(500).send(err);
				});
		} 
		else {
			Response.destroy({id: responses._id})
				.then(function(resp) {
					res.status(200).send();
				})
				.catch(function(err) {
					res.status(500).send(err);
				});
		}

		
	} else res.status(200);
}