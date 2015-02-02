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
  User.findOrCreate({where: {email:req.body.user.email}, defaults: {name:req.body.user.name}})
      .spread(function(user,created){
        console.log('created',created);
        return user;
      })
      .then(function(user){
        Event.create({
          title: req.body.event.title,
          sendername: req.body.user.name,
          senderemail: req.body.user.email,
          description: req.body.event.description,
          location: req.body.event.location,
          onlyDays:  false,
          isPrivate: false
        }).then(function(event){
            event.setUser(user).then(function(event){
              console.log('success?');
            });
            Time.bulkCreate(req.body.time).then(function(timesCreated){
              timesCreated.forEach(function(time){
                time.setEvent(event);
              });
              res.send(200,{time: timesCreated});
            });
          });
      }).error(function(err){
        console.log('error',err);
        res.send(500);
      });
};

exports.findEvent = function(req,res){
  var eventId = req.params.id;
  res.send(200);
};
