var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('U9hirrMBBGHpVhP3ARZy_A');

function sendAdminEmail(createdEvent,creator){

  var toEmail = [{
    email: creator.email,
    name: 'The Team at Let\'s!',
    type: 'to'
  }];
  var message = {
    html: '<p>Here are two links, the first to send to your friends, and the second to manage and view the responses.' +
    ' It is advised to keep the second one private</p>' +
    '<a href="localhost:9000/event/"' + createdEvent._id + '>The Event: localhost:9000/event/'+createdEvent._id+'</a>' +
      '<a href="localhost:9000/manageEvent/"' + createdEvent.adminURL + '>The Event: localhost:9000/manageEvent/'+createdEvent.adminURL+'</a>',
    text: 'some example text cooooool',
    subject: 'Let\'s find a time for '+ createdEvent.title  +'!',
    from_email: 'TheTeam@lets.com',
    from_name: creator.name,
    to: toEmail
  };
  mandrill_client.messages.send({message:message,async:'async'},
    function(result){
      console.log('messages Result!!!!!!',result);
    },function(err){
      console.log('A Mandrill Error has occurred',err, err.name+ err.message);
    });

}

module.exports = {
  sendEmail: sendAdminEmail
};
