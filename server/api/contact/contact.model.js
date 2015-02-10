'use strict';

var email_regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
var phone_regex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/gi;

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
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models){
        Contact.belongsTo(models.User);
        Contact.belongsToMany(models.Event, {through: 'EventContacts'});
      },
      saveEmailContacts: function(contactInfo,createdEvent){
        if (contactInfo.emails){
          var emailContacts = [];
          var emails = contactInfo.emails.toLowerCase().match(email_regex);
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
        return [];
      },
      savePhoneContacts: function(contactInfo,createdEvent){
        if (contactInfo.phoneNumbers){
          var phoneContacts = [];
          var phoneNumbers = contactInfo.phoneNumbers.match(phone_regex);
          console.log('phoneNumbers',phoneNumbers)

          phoneNumbers.forEach(function(indPhone) {
            phoneContacts.push({
              phone: parseInt(indPhone),
              UserId: createdEvent.UserId
            });
          });
          var phonePromises = [];
          phoneContacts.forEach(function(contact){
            phonePromises.push(Contact.findOrCreate({where: {phone: contact.phone}, defaults: contact})
              .spread(function(contact,created){
                contact.addEvent(createdEvent);
                //console.log('created contact',contact,created);
                return contact;
              })
              .error(function(err){
                console.log('err in creating contact',err);
              }));
          });
          return phonePromises;
        }
        return [];
      }
    }
  });
  return Contact;
};
