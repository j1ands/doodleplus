'use strict';

var sqldb = require('../../sqldb');
var Contact = sqldb.Contact;
var Event = sqldb.Event;
var User = sqldb.User;
// Gets list of emails from the DB.
exports.index = function(req, res) {
  res.json([]);
};

exports.create = function(req,res){
  User.find({where: {EventId: req.body.event._id}}).then(function(eventCreator){
    Contact.saveNewContacts(req.body.emails,eventCreator,req.body.event);
  })
    .then(function(){
      res.status(200);
    })
    .catch(function(err){
      console.log('erring finding users while saving contacts',err);
      res.send(500)
    });
};
