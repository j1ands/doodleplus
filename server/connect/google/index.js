'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../../auth/auth.service');

var router = express.Router();

router
  .get('/', passport.authorize('google', {
    failureRedirect: '/signup',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.google.com/m8/feeds'

    ],
    session: false
  }))

  .get('/callback', passport.authorize('google', {
    failureRedirect: '/signup',
    session: false
  }), auth.setTokenCookie);

module.exports = router;