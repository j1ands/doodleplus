/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var User = require('../../sqldb').User;

exports.register = function(socket) {
  // User.hook('afterCreate', function(doc, fields, fn) {
  //   onSave(socket, doc);
  //   fn(null);
  // });
  User.hook('afterUpdate', function(doc, fields, fn) {
    onSave(socket, doc);
    fn(null);
  });
  // User.hook('afterDestroy', function(doc, fields, fn) {
  //   onRemove(socket, doc);
  //   fn(null);
  // });
};

function onSave(socket, doc, cb) {
  console.log("DOC",doc);
  socket.emit('user:save');
}

function onRemove(socket, doc, cb) {
  socket.emit('user:remove', doc);
}
