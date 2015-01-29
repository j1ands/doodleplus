/**
 * Sequelize initialization module
 */

'use strict';

var path = require('path');
var config = require('../config/environment');

var Sequelize = require('sequelize');

//console.log("URI", config.sequelize.uri);

var db = {
  Sequelize: Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

db.Thing = db.sequelize.import(path.join(
  config.root,
  'server',
  'api',
  'thing',
  'thing.model'
));

db.User = db.sequelize.import(path.join(
  config.root,
  'server',
  'api',
  'user',
  'user.model'
));

// Insert models below
db.Email = db.sequelize.import(path.join(
  config.root,
  'server',
  'api',
  'email',
  'email.model'
));
db.Response = db.sequelize.import(path.join(
  config.root,
  'server',
  'api',
  'response',
  'response.model'
));
db.Time = db.sequelize.import(path.join(
  config.root,
  'server',
  'api',
  'time',
  'time.model'
));
db.Event = db.sequelize.import(path.join(
  config.root,
  'server',
  'api',
  'event',
  'event.model'
));
db.Event = db.sequelize.import(path.join(
  config.root,
  'server',
  'api',
  'Event',
  'Event.model'
));

module.exports = db;
