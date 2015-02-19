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
    '<div>Response Link <a href="http://www.findatime.io/event/'+createdEvent._id +'" mc:disable-tracking>www.findatime.io/event/'+createdEvent._id+'</a></div>' +
      '<div><a href="http://www.findatime.io/manageEvent/'+ createdEvent.adminURL +'" mc:disable-tracking>Admin Link</a></div>',
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
