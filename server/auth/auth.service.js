'use strict';

var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../sqldb').User;
var validateJwt = expressJwt({
  secret: config.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.find({
        where: {
          _id: req.user._id
        }
      })
        .then(function(user) {
          if (!user) {
            return res.send(401);
          }
          req.user = user;
          next();
        })
        .catch(function(err) {
          return next(err);
        });
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >=
          config.userRoles.indexOf(roleRequired)) {
        next();
      }
      else {
        res.send(403);
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  return jwt.sign({ _id: id }, config.secrets.session, {
    expiresInMinutes: 60 * 5
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user) {
    return res.json(404, {
      message: 'Something went wrong, please try again.'
    });
  }
  var token = signToken(req.user._id, req.user.role);
  res.cookie('usertoken', JSON.stringify(token));
  //console.log(req);
  //res.send(200, req);
  //res.redirect('/manageEvent/' + req.currentUser.eventId);
  //console.log("CONTACTS", req.contacts);
  res.redirect('/close');
}


/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isRespondee() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      var jwtString = req.cookies.token || req.query.uuid;

      if(jwtString)
      {
        if(jwtString[0] == "\"")
        {
          jwtString = jwtString.substr(1);
          jwtString = jwtString.substring(0,jwtString.length-1);    
        }
      }


      jwt.verify(jwtString, 'doodleplus-secret', {secret: 'doodleplus-secret'}, function(err, decoded) {
        console.log("ERRR", err);
        if (err) return res.status(401).send({message: 'Refresh Page'});
        req.user = decoded;
        next();
      });
  });
}



exports.isRespondee = isRespondee;
exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
