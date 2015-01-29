/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Event = require('../../sqldb').Event;

exports.register = function(socket) {
  Event.hook('afterCreate', function(doc, fields, fn) {
    onSave(socket, doc);
    fn(null);
  });
  Event.hook('afterUpdate', function(doc, fields, fn) {
    onSave(socket, doc);
    fn(null);
  });
  Event.hook('afterDestroy', function(doc, fields, fn) {
    onRemove(socket, doc);
    fn(null);
  });
};

function onSave(socket, doc, cb) {
  socket.emit('event:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('event:remove', doc);
}
