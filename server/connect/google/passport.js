var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GoogleContacts = require('google-contacts').GoogleContacts;

exports.setup = function(User, config) {
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

      if(!req.currentUser)
      {
        // User.find({where: { 'googleId': profile.id }
        // })
        //   .then(function(user) {
        //     if (!user) {
        //       User.create({
        //         name: profile.displayName,
        //         email: profile.emails[0].value,
        //         role: 'user',
        //         username: profile.username,
        //         provider: 'google',
        //         google: profile._json
        //       })
        //         .then(function(user) {
        //           return done(null, user);
        //         })
        //         .catch(function(err) {
        //           return done(err);
        //         });
        //     } else {
        //       return done(null, user);
        //     }
        //   })
        //   .catch(function(err) {
        //     return done(err);
        //   }); 
        return done("Invalid request");       
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
              // var googleProfile = profile._json;
              // googleProfile.contacts = contacts;
              // user.setDataValue('google', googleProfile);
              // user.setDataValue('googleId', profile.id);
              // user.save()
              // .then(function(savedUser){
                req.user = user;
                req.contacts = contacts;
                //res.status(205).json({contacts: contacts});
                return done(null, contacts);
              // });
            }
          });

        });
      }
  }));
};
