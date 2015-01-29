/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Response = require('../../sqldb').Response;

exports.register = function(socket) {
  Response.hook('afterCreate', function(doc, fields, fn) {
    onSave(socket, doc);
    fn(null);
  });
  Response.hook('afterUpdate', function(doc, fields, fn) {
    onSave(socket, doc);
    fn(null);
  });
  Response.hook('afterDestroy', function(doc, fields, fn) {
    onRemove(socket, doc);
    fn(null);
  });
};

function onSave(socket, doc, cb) {
  socket.emit('response:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('response:remove', doc);
}
