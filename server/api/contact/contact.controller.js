'use strict';

var sqldb = require('../../sqldb');
var Contact = sqldb.Contact;
var Event = sqldb.Event;
var User = sqldb.User;
var bluebird = require('bluebird');
var sendMessage = require('./sendEmail');
var twilio = require('twilio');
// Gets list of emails from the DB.
exports.index = function(req, res) {
  res.json([]);
};

exports.create = function(req,res){
  Event.find({where: {_id: req.body.eventId}}).then(function(event){
    var contactArray = [];
    var emailPromises = Contact.saveEmailContacts(req.body.contacts,event);
    var phonePromises = Contact.savePhoneContacts(req.body.contacts,event);
    var allPromises = emailPromises.concat(phonePromises);
    bluebird.all(allPromises).then(function(contacts){
      contactArray = contacts;
      return User.find({where: {_id: event.UserId}}).then(function(creator){
        return creator;
      });
    }).then(function(creator){
      var contactData = {creator: creator,contacts: contactArray};
      sendMessage.email(contactData,event);
      sendMessage.text(contactData,event);
      res.status(200).send({success: true});
    }).error(function(err){
      console.log('err',err);
    });
  })
    .catch(function(err){
      console.log('err in find event',err);
    });

};
