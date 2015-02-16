'use strict';
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('U9hirrMBBGHpVhP3ARZy_A');
var twilAccSid = 'AC2080f2c28b360c592e1b6912d8c91902';
var twilAuthToken = '43c3aa15358b9e281ff3f88f45561df5';
var twilClient = require('twilio')(twilAccSid,twilAuthToken);
var bluebird = require('bluebird');


function sendEmail(emailData,createdEvent) {
  if (emailData.contacts){
    var toEmail = [];
    emailData.contacts.forEach(function (contact) {
      if (contact.email){
        toEmail.push({
          email: contact.email,
          name: 'You\'re invited to an amazing Event!',
          type: 'to'
        });
      }
    });
    var message = {
      html: '<a href="http://localhost:9000/eventResponse/"' + createdEvent._id + '>The Event: http://localhost:9000/eventResponse/'+createdEvent._id+'</a>',
      text: 'some example text cooooool',
      subject: 'You\'ve been invited to a super cool event!',
      from_email: emailData.creator.email,
      from_name: emailData.creator.name,
      to: toEmail
    };
    if (toEmail){
      mandrill_client.messages.send({message:message,async:'async'},
        function(result){
          console.log('messages Result!!!!!!',result);
        },function(err){
          console.log('A Mandrill Error has occurred',err, err.name+ err.message);
        });
    }
  }
}
function textBody(phoneData,createdEvent){
  var template = 'Hello, '+ phoneData.creator.name + ' has invited you to their amazing event: '+ createdEvent.title+ '.\n' +
    'Pleased respond by using this link \nhttp://localhost:9000/event/'+ createdEvent._id;
  if (createdEvent.isPrivate){
    //do something else;
  }
  return template;
}

function sendTwilText(to,from,body){
  if (to.length===10){
    to= '+1'+to;
  } else if (to.length===11) {
    to = '+' + to;
  } else {
    throw "number not correct";
  }
  twilClient.messages.create({
    to: to,
    from: '7324225093',
    body: body
  },function(err,responseData){
    if (err){
      console.log('error in sending text message',err.message);
    }
  });
}

function sendText(contactData,createdEvent){
  var body = textBody(contactData,createdEvent);
  //console.log('contactData',contactData);
  //console.log('body',body);
  contactData.contacts.forEach(function(contact){
    if (contact.phone){
      sendTwilText(contact.phone,null,body);
    }
  });
}


module.exports = {
  email: sendEmail,
  text: sendText
};
