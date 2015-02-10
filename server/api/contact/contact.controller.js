'use strict';

var sqldb = require('../../sqldb');
var Contact = sqldb.Contact;
var Event = sqldb.Event;
var User = sqldb.User;
var bluebird = require('bluebird');
var sendEmail = require('./sendEmail').sendEmail;
// Gets list of emails from the DB.
exports.index = function(req, res) {
  res.json([]);
};

exports.create = function(req,res){
  console.log('this is the request',req.body);
  Event.find({where: {_id: req.body.eventId}}).then(function(event){
    var emailPromises = Contact.saveNewContacts(req.body.contacts,event);
    bluebird.all(emailPromises).then(function(contactArray){
      return {creator: User.find({where: {_id: event.UserId}}).then(function(creator){
        return creator;
      }),
        contacts: contactArray
      };
    }).then(function(emailData){
      sendEmail(emailData,event);
      res.send(200);
    }).error(function(err){
      console.log('err',err);
    });
  })
    .catch(function(err){
      console.log('err in find event',err);
    });


  //User.find({where: {EventId: req.body.eventId }}).then(function(eventCreator){
  //  console.log('the event Creator',eventCreator);
  //  console.log('the req.body',req.body);
  //  //Contact.saveNewContacts(req.body.emails,eventCreator,req.body.event);
  //})
  //  .then(function(){
  //    res.status(200);
  //  })
  //  .catch(function(err){
  //    console.log('erring finding users while saving contacts',err);
  //    res.send(500);
  //  });
};
