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
db.Contact = db.sequelize.import(path.join(
  config.root,
  'server',
  'api',
  'contact',
  'contact.model'
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

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = db;
