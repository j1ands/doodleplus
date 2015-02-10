var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GoogleContacts = require('google-contacts').GoogleContacts;

exports.setup = function(User, config) {
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {

    var c = new GoogleContacts({
      token: accessToken,
      consumerKey: config.google.clientID,
      consumerSecret: config.google.clientSecret
    });
    c.on('error', function(e){
      console.log('error', e);
    });
    c.on('contactsReceived', function (contacts) {
      console.log('contacts: ' + contacts);
    });
    c.getContacts(function(e){
      console.log(e);
    });    

    User.find({where: { 'googleId': profile.id }
    })
      .then(function(user) {
        if (!user) {
          User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'user',
            username: profile.username,
            provider: 'google',
            google: profile._json
          })
            .then(function(user) {
              return done(null, user);
            })
            .catch(function(err) {
              return done(err);
            });
        } else {
          return done(null, user);
        }
      })
      .catch(function(err) {
        return done(err);
      });
  }));
};
