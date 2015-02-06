var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('U9hirrMBBGHpVhP3ARZy_A');


function genEmail(emails,creator,createdEvent) {
  if (emails) {
    var toEmail = [];
    emails.forEach(function (indEmail) {
      toEmail.push({
        email: indEmail,
        name: 'none',
        type: 'to'
      });
    });
    var message = {
      html: '<a href="localhost:9000/eventResponse/"' + createdEvent._id + '>The Event :localhost:9000/eventResponse/'+createdEvent._id+'</a>',
      text: 'some example text cooooool',
      subject: 'You\'ve been invited to a super cool event!',
      from_email: creator.email,
      from_name: creator.name,
      to: toEmail
    };
    mandrill_client.messages.send({message:message,async:'async'},
         function(result){
         console.log('messages Result!!!!!!',result);
       },function(err){
         console.log('A Mandrill Error has ocurred',err, err.name+ err.message);
       });
  }
}


module.exports = {
  sendEmail: genEmail
};
