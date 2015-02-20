'use strict';

var sqldb = require('../../sqldb');
var User = sqldb.User;
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');


var generateUUID = function() {
  var d = new Date().getTime();
  var UUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return UUID;
}

 /* Creates a new respondee - NO login - just uses tokens
 */
exports.createRespondee = function(req, res) {
  console.log("createRespondee");
  var UUID = generateUUID();
  var token = jwt.sign({ UUID: UUID }, config.secrets.session, {
	expiresInMinutes: 524160;
      // expiresInMinutes: 60 * 730 // Do we want the token to expire?
    });
  res.json({ token: token });
};


/**
 * Get a respondee's UUID
 */
exports.getRespondee = function(req, res, next) {
  var UUID = req.user.UUID;

  if (!UUID) {
    return res.send(404);
  }
    res.json({UUID: UUID});
};
