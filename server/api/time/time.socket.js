/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Time = require('../../sqldb').Time;

exports.register = function(socket) {
  Time.hook('afterCreate', function(doc, fields, fn) {
    onSave(socket, doc);
    fn(null);
  });
  Time.hook('afterUpdate', function(doc, fields, fn) {
    onSave(socket, doc);
    fn(null);
  });
  Time.hook('afterDestroy', function(doc, fields, fn) {
    onRemove(socket, doc);
    fn(null);
  });
};

function onSave(socket, doc, cb) {
  socket.emit('time:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('time:remove', doc);
}
