/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Email = require('../../sqldb').Email;

exports.register = function(socket) {
  Email.hook('afterCreate', function(doc, fields, fn) {
    onSave(socket, doc);
    fn(null);
  });
  Email.hook('afterUpdate', function(doc, fields, fn) {
    onSave(socket, doc);
    fn(null);
  });
  Email.hook('afterDestroy', function(doc, fields, fn) {
    onRemove(socket, doc);
    fn(null);
  });
};

function onSave(socket, doc, cb) {
  socket.emit('email:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('email:remove', doc);
}
