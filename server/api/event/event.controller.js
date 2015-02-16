'use strict';



var sqldb = require('../../sqldb');
var User = sqldb.User;
var Event = sqldb.Event;
var Time  = sqldb.Time;
var Response = sqldb.Response;
var Contact = sqldb.Contact;
var Response = sqldb.Response;
var sendEmail = require('./sendEmails').sendEmail;

// Gets list of events from the DB

exports.index = function(req, res) {
	res.json([]);
};

exports.create = function(req, res) {
  User.findOrCreate({where: {email: req.body.user.email}, defaults: req.body.user})
    .spread(function(creator){
      Event.saveNewEvent(req.body, creator).then(function(createdEvent) {
        sendEmail(createdEvent,creator);
        Time.saveEventTimes(req.body, creator, createdEvent).then(function (createdTimes) {
          res.status(200).send({createdEvent: createdEvent, user: creator});
        })
        .catch(function(err){
          console.log('err',err);
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
    as: 'times',
    include: [{
      model: Response,
      as: 'responses'}]
  }]}).then(function(event){
    event.adminURL = null;
    res.status(200).send(event);
  });
};

exports.findManageEvent = function(req,res){
  var admin = req.params.admin;
  Event.find({where: {adminURL: admin}, include: [{
    model: Time,
    as: 'times',
    include: [{
      model: Response,
      as: 'responses'}]
    }]
  })
  .then(function(event){
    res.status(200).send(event);
  })
  .catch(function(err){
    res.status(401).send("Invalid URL");
  })
};

exports.update = function(req,res){
  var admin = req.params.admin;
  Event.find({where: {adminURL: admin}})
    .then(function(event){
      event.description = req.body.event.description;
      event.title = req.body.event.title;
      event.location = req.body.event.location;
      event.save()
        .then(function(savedEvent){
          savedEvent.success=true;
          res.status(200).send({event: savedEvent,success: true});
        })
        .catch(function(err){
          console.log('error saving',err);
          res.status(401).send({success:false});
        });
    });
};


