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
  console.log('req.body',req.body);
  User.findOrCreate({where: {email:req.body.user.email}, defaults: {name:req.body.user.name}})
      .spread(function(user,created){
        return user;
      })
      .then(function(user){
        Event.create({
          title: req.body.event.title,
          sendername: req.body.user.name,
          senderemail: req.body.user.email,
          description: req.body.event.description,
          location: req.body.event.location,
          onlyDays: req.body.time.increment == "24 Hours" ? true : false
        }).then(function(event){
            event.setUser(user).then(function(event){
              console.log('success?');
            });
            Time.bulkCreate(req.body.time).success(function(timesCreated){
              timesCreated.forEach(function(time){
                time.setEvent(event);
              });
              res.send(200,{time: timesCreated});
            });
          });
      });
};
