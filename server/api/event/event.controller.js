'use strict';



var sqldb = require('../../sqldb');
var Event = sqldb.Event;
var Time  = sqldb.Time;
// Gets list of events from the DB

var User = sqldb.User;

exports.index = function(req, res) {
	res.json([]);
};

exports.create = function(req, res) {
  User.findOrCreate({where: {email: req.body.user.email}, defaults: {name: req.body.user.name}})
    .spread(function(user,created){
      console.log('created',created);
      return user;
    })
    .then(function(user){
      return Event.create({
        title:req.body.event.title,
        sendername: req.body.user.name,
        senderemail: req.body.user.email,
        description: req.body.event.description,
        location: req.body.event.location,
        onlyDays: false,
        isPrivate: false
      }).then(function(event){
        return event.setUser(user);
      });
    })
    .then(function(event){
      req.body.time.forEach(function(elem){
        elem.EventId = event._id;
        console.log(elem);
      });
    })
    .then(function(){
      return Time.bulkCreate(req.body.time);
    })
    .then(function(timesCreated){
      res.status(200).send({time:timesCreated});
    })
    .catch(function(err){
      console.log('err',err);
      res.status(500);
    });
};

exports.findEvent = function(req,res){
  var eventId = req.params.id;
  Event.find({where: {_id: eventId}, include: [Time]}).then(function(event){
    console.log(event);
    res.status(200).send(event);
  });
};
