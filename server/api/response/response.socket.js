/**
 * Broadcast updates to client when the model changes
 */

'use strict';

//work here to setup hook for save and update

var Response = require('../../sqldb').Response;

exports.register = function(socket) {
  // Response.hook('afterCreate', function(doc, fields, fn) {
  //   console.log("After create, hook fired.")
  //   onSave(socket, doc);
  //   fn(null);
  // });
  // Response.hook('afterUpdate', function(doc, fields, fn) {
  //   console.log("After update, hook fired.")
  //   onSave(socket, doc);
  //   fn(null);
  // });
  // Response.hook('afterDestroy', function(doc, fields, fn) {
  //   onRemove(socket, doc);
  //   fn(null);
  // });
  Response.hook('afterBulkCreate', function(response, options, fn) {
    console.log(response);
    onSave(socket, response);
    fn(null);
  })
};

function onSave(socket, doc, cb) {
  socket.emit('response:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('response:remove', doc);
}
