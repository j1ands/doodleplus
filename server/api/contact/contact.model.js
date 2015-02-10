'use strict';

var sendEmail = require('./sendEmail').sendEmail;
var email_regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;


module.exports = function(sequelize, DataTypes) {
  var Contact = sequelize.define('Contact', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    }
  }, {
    classMethods: {
      associate: function(models){
        Contact.belongsTo(models.User);
        Contact.belongsToMany(models.Event, {through: 'EventContacts'});
      },
      saveNewContacts: function(contactInfo,createdEvent){

        if (contactInfo.emails){
          var emailContacts = [];

          console.log('contactInfo Emails',contactInfo.emails,typeof contactInfo.emails);
          var emails = contactInfo.emails.toLowerCase().match(email_regex);
          //var emails =contactInfo.emails.toLowerCase().match(email_regex);
          console.log('emails',emails);
          emails.forEach(function(indEmail){
            emailContacts.push({
              email: indEmail,
              UserId: createdEvent.UserId
            });
          });
          var emailPromises = [];
          emailContacts.forEach(function(contact){
            emailPromises.push(Contact.findOrCreate({where: {email: contact.email}, defaults: contact})
              .spread(function(contact,created){
                contact.addEvent(createdEvent);
                //console.log('created contact',contact,created);
                return contact;
              })
              .error(function(err){
                console.log('err in creating contact',err);
              }));
          });
          return emailPromises;
        }
      }
    }
  });
  return Contact;
};
