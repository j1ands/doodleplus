var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GoogleContacts = require('google-contacts').GoogleContacts;

exports.setup = function(User, Event, config) {
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.connectCallbackURL,
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {

    var contacts = new GoogleContacts({
      token: accessToken,
      consumerKey: config.google.clientID,
      consumerSecret: config.google.clientSecret
    });

    console.log("DONE", done);

      if(!req.currentUser.userId)
      {
        Event.find({where: {'id': req.currentUser.eventId}})
          .then(function(event){
        User.find({where: {'id': event.UserId}})
          .then(function(user){
            contacts.getContacts(function(e, contacts){
              if(e)
              {
                console.log('error', e);
                return done(e);
              }
              else
              {
                var googleProfile = profile._json;
                googleProfile.contacts = contacts;
                user.setDataValue('google', googleProfile);
                user.setDataValue('googleId', profile.id);
                user.save()
                .then(function(savedUser){
                  req.user = savedUser;
                  req.contacts = contacts;
                  return done(null, savedUser);
                });
              }
            });            
          })
          })
      }
      else
      {
        User.find({where: {_id: req.currentUser.userId}
        })
        .then(function(user){
          if(!user)
          {
            return done("no user");
          }

          contacts.getContacts(function(e, contacts){
            if(e)
            {
              console.log('error', e);
              return done(e);
            }
            else
            {
              var googleProfile = profile._json;
              googleProfile.contacts = contacts;
              user.setDataValue('google', googleProfile);
              user.setDataValue('googleId', profile.id);
              user.save()
              .then(function(savedUser){
                req.user = savedUser;
                req.contacts = contacts;
                return done(null, savedUser);
              });
            }
          });
        });
      }
  }));
};
