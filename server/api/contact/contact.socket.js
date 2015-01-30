/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Contact = require('../../sqldb').Contact;

exports.register = function(socket) {
  Contact.hook('afterCreate', function(doc, fields, fn) {
    onSave(socket, doc);
    fn(null);
  });
  Contact.hook('afterUpdate', function(doc, fields, fn) {
    onSave(socket, doc);
    fn(null);
  });
  Contact.hook('afterDestroy', function(doc, fields, fn) {
    onRemove(socket, doc);
    fn(null);
  });
};

function onSave(socket, doc, cb) {
  socket.emit('Contact:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('Contact:remove', doc);
}
