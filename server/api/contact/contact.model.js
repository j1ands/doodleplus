'use strict';

var sendEmail = require('./sendEmail').sendEmail;

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
      saveNewContacts: function(reqBody,creator,createdEvent){
        if (reqBody.emails){
          var individualEmail = reqBody.emails.trim().split(',');
          var contacts = [];
          individualEmail.forEach(function (elem) {
            contacts.push({
              email: elem.trim(),
              UserId: creator._id
            });
          });
          contacts.forEach(function(contact){
            Contact.findOrCreate({where: {email: contact.email},defaults: contact })
              .spread(function(contact,created){
                if (!created) {
                  contact.addEvent(createdEvent);
                }
              })
              .error(function(err){
                console.log('err in saving contacts',err);
              });
          });
          sendEmail(individualEmail,creator,createdEvent);
        }
      }
    }
  });
  return Contact;
};
