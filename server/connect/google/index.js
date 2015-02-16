'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../../auth/auth.service');

var router = express.Router();

var CaptureReq = function(userId, eventId) {
  this.userId = userId;
  this.eventId = eventId;
} 

var capture;

router
  .get('/', function(req, res, next) {
    capture = new CaptureReq(req.query.user, req.query.event);
    next();
  },passport.authorize('google', {
    failureRedirect: '/signup',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/contacts.readonly'

    ],
    session: false
  }))

  .get('/callback', function(req, res, next) {
    req.currentUser = capture;
    next();
  }, passport.authorize('google', {
    failureRedirect: '/signup',
    session: false
  }), auth.setTokenCookie);

module.exports = router;