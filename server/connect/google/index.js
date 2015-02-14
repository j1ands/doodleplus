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
    console.log("i got here");
    console.log("------");
    console.log("in index.js", req.query);
    console.log("------");
    console.log("original url", req.originalUrl);
    console.log("------");
    console.log("url", req.url);
    capture = new CaptureReq(req.query.user, req.query.event);
    console.log("in indexjs", capture)
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
    console.log("indexjs");
    console.log(capture);
    console.log(capture.userId);
    req.currentUser = capture;
    next();
  }, passport.authorize('google', {
    failureRedirect: '/signup',
    session: false
  }), auth.setTokenCookie);

module.exports = router;