'use strict';

var sqldb = require('../../sqldb');
var Event = sqldb.Event;
var Time = sqldb.Time;
var User = sqldb.User;

exports.index = function(req, res) {
	res.json([]);
};

exports.create = function(req, res) {
	var userId;
	User.findOrCreate({where: {email: req.body.user.email}, defaults: {name: req.body.user.name}})
	.spread(function(user, created){
		userId = user.values._id;
	})
	.then(function(){
		Event.build({
			title: req.body.event.title,
			sendername: req.body.user.name,
			senderemail: req.body.user.email,
			description: req.body.event.description,
			location: req.body.event.location,
			onlyDays: req.body.time.increment == "24 Hours" ? true : false,
			UserId: userId
	})
	.save()
	.then(function(event){

		var times = [];
		var incrementInMilli;
		var currentTime = req.body.time.date;

		switch(req.body.time.increment)
		{
			case "15 Minutes":
				incrementInMilli = 900000;
				break;
			case "30 Minutes":
				incrementInMilli = 1800000;
				break;
			case "1 Hour":
				incrementInMilli = 3600000;
				break;
			case "24 Hours":
				incrementInMilli = 86400000;
				break;
		}

		function buildTimes(){
			if(currentTime < req.body.time.date + 86400000)
			{
				Time.build({
					time: currentTime,
					EventId: event._id
				})
				.save()
				.then(function(newTime){
					currentTime += incrementInMilli;
					times.push(newTime);
					buildTimes();
				})
			}
			else
			{
				res.send(200, {times:times});
			}
		}

		buildTimes();
	})
	})
}
