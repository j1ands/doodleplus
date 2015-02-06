'use strict';



var sqldb = require('../../sqldb');
var Event = sqldb.Event;
var Time  = sqldb.Time;
var Contact = sqldb.Contact;
var Response = sqldb.Response;
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('U9hirrMBBGHpVhP3ARZy_A');

// Gets list of events from the DB

var User = sqldb.User;

exports.index = function(req, res) {
	res.json([]);
};

exports.create = function(req, res) {

  User.findOrCreate({where: {email: req.body.user.email}, defaults: req.body.user})
    .spread(function(creator){
      Event.saveNewEvent(req.body,creator).then(function(createdEvent){

          Time.saveEventTimes(req.body,creator,createdEvent).then(function(createdTimes){
             //console.log('createdTimes',createdTimes);
          });
        return createdEvent;
      }).then(function(createdEvent){
        Contact.saveNewContacts(req.body,creator,createdEvent); //Currently Doesn't return a promise
      }).then(function(){
        console.log('we did it!');
        res.status(200);
      });
    });







  //var eventId;
  //var userId;
  //var eventCopy;
  //User.findOrCreate({where: {email: req.body.user.email}, defaults: {name: req.body.user.name}})
  //  .spread(function(user,created){
  //    console.log('created',created);
  //    userId = user._id;
  //    return user;
  //  })
  //  .then(function(user){
  //    return Event.create({
  //      title:req.body.event.title,
  //      senderName: req.body.user.name,
  //      senderEmail: req.body.user.email,
  //      description: req.body.event.description,
  //      location: req.body.event.location,
  //      onlyDays: false,
  //      isPrivate: false
  //    }).then(function(event){
  //      eventId = event._id;
  //      return event.setUser(user);
  //    });
  //  })
  //  .then(function(event){
  //    eventCopy = event;
  //    req.body.time.forEach(function(elem){
  //      elem.EventId = event._id;
  //    });
  //  })
  //  .then(function(){
  //    return Time.bulkCreate(req.body.time);
  //  })
  //  .then(function(timesCreated){
  //    genEmail(req.body.emails,req.body.user,eventId);
  //    saveContacts(req.body.emails,eventCopy,userId);
  //    res.status(200).send({time:timesCreated});
  //  })
  //  .catch(function(err){
  //    console.log('err',err);
  //    res.status(500);
  //  });
};

exports.findEvent = function(req,res){
  var eventId = req.params.id;
  Event.find({where: {_id: eventId}, include: [{
    model: Time,
    as: 'times',
    include: [Response]
  }]}).then(function(event){
    res.status(200).send(event);
  });
};

function genEmail(emails,user,eventId) {
  if (emails) {
    var individualEmail = emails.trim().split(',');
    var toEmail = [];
    individualEmail.forEach(function (email) {
      toEmail.push({
        email: email,
        name: 'none',
        type: 'to'
      });
    });
    var message = {
      html: '<a href="localhost:9000/eventResponse/"' + eventId + '>The Event</a>',
      text: 'some example text cooooool',
      subject: 'You\'ve been invited to a super cool event!',
      from_email: user.email,
      from_name: user.name,
      to: toEmail
    };
    // mandrill_client.messages.send({message:message,async:'async'},
    //     function(result){
    //     console.log('messages Result!!!!!!',result);
    //   },function(err){
    //     console.log('A Mandrill Error has ocurred',err, err.name+ err.message);
    //   });
    }
  }


function saveContacts(emails,event,userId) {
  if (emails){
    var individualEmail = emails.trim().split(',');
    var contacts = [];
    individualEmail.forEach(function (elem) {
      contacts.push({
        email: elem,
        UserId: userId
      });
    });
    contacts.forEach(function(contact){
      Contact.findOrCreate({where: {email: contact.email},defaults: contact })
        .spread(function(contact,created){
          contact.addEvent(event);
        })
        .error(function(err){
          console.log('err',err);
        });
    });
  }
}




