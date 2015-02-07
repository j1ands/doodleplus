'use strict';



var sqldb = require('../../sqldb');
var User = sqldb.User;
var Event = sqldb.Event;
var Time  = sqldb.Time;
var Response = sqldb.Response;
var Contact = sqldb.Contact;

// Gets list of events from the DB

exports.index = function(req, res) {
	res.json([]);
};

exports.create = function(req, res) {
  User.findOrCreate({where: {email: req.body.user.email}, defaults: req.body.user})
    .spread(function(creator){
      Event.saveNewEvent(req.body,creator).then(function(createdEvent) {
        Time.saveEventTimes(req.body, creator, createdEvent).then(function (createdTimes) {
          res.status(200).send({EventId: createdEvent});
        });
      }).catch(function(err){
        console.log('Event Save Failed. Reason:',err);
        res.status(500);
    });
  });
};

exports.findEvent = function(req,res){
  var eventId = req.params.id;
  Event.find({where: {_id: eventId}, include: [{
    model: Time,
    // as: 'times',
    include: [Response]
  }]}).then(function(event){
    res.status(200).send(event);
  });
};


