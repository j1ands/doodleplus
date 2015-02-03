'use strict';



var sqldb = require('../../sqldb');
var Event = sqldb.Event;
var Time  = sqldb.Time;
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('U9hirrMBBGHpVhP3ARZy_A');

// Gets list of events from the DB

var User = sqldb.User;

exports.index = function(req, res) {
	res.json([]);
};

exports.create = function(req, res) {
  var eventId;
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
        eventId = event._id;
        return event.setUser(user);
      });
    })
    .then(function(event){
      req.body.time.forEach(function(elem){
        elem.EventId = event._id;
      });
    })
    .then(function(){
      return Time.bulkCreate(req.body.time);
    })
    .then(function(timesCreated){
      genEmail(req.body.emails,req.body.user,eventId);
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

function genEmail(emails,user,eventId){
  if (emails){
    var individualEmail = emails.split(',');
    var toEmail = []
    individualEmail.forEach(function(email){
      toEmail.push({
        email: email,
        name: 'none',
        type: 'to'
      });
    });
    var message = {
      html: '<p>Hey! this is in a p element</p><a href="localhost:9000/eventResponse/"'+eventId+'>The Event</a>',
      text: 'some example text cooooool',
      subject: 'You\'ve been invited to a super cool event!',
      from_email: user.email,
      from_name: user.name,
      to: toEmail
    };
    mandrill_client.messages.send({message:message,async:'async'},function(result){
      console.log('messages Result!!!!!!',result);
    },function(err){
      console.log('A Mandrill Error has ocurred',err, err.name+ err.message);
    });
  }
}



