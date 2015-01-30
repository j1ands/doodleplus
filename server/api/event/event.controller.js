'use strict';



var sqldb = require('../../sqldb');
var Event = sqldb.Event;
// Gets list of events from the DB

var User = sqldb.User;

exports.index = function(req, res) {
	res.json([]);
};

exports.create = function(req, res) {
	// (req.body.user.email )
	var userId;
	User.findOrCreate({where: {email: req.body.user.email}, defaults: {name: req.body.user.name}})
	.spread(function(user, created){
		console.log(user.values)
		console.log(created)
		userId = user.values._id;
	})
	.then(function(){
		Event.build({
			name: req.body.event.name,
			sendername: req.body.user.name,
			senderemail: req.body.user.email,
			description: req.body.event.description,
			location: req.body.event.location,
			onlyDays: req.body.time.increment == "24 Hours" ? true : false,
			UserId: userId
	})
	.save()
	.then(function(event){
		res.send(200, event)
	})
	})
// console.log(User);
// res.send(200, req.body);
}
