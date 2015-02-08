'use strict';

angular.module('doodleplusApp')
  .factory('Response', function ($resource, storeEvent) {

    var Response = $resource('/api/responses/:id',{id: '@id'}, { // Might need to be updated
      update: {
        method: 'PUT'
      }
    });

    // I saw that some node module was added for UUIDs, but not sure if it can be accessed for this?
    Response.getOrCreateUUID = function() {
      if (localStorage.UUID) {
        return localStorage.UUID;
      } else {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        localStorage.UUID = uuid;
        return uuid;
      }
    };

    Response.saveResponses = function(username, UUID, oldResponses) {
      var times = storeEvent.event.times;
      var responses = [];

      console.log("OLDE", oldResponses);
      Response.remove({responses: oldResponses});

      times.forEach(function(time) {
        if (time.status) {
          responses.push({TimeId: time._id, 
                          status: time.status, 
                          username: username,
                          UUID: UUID
                        });
        }
      })
      Response.save({
        responses: responses
      }, function(res) {
        console.log("Responses saved!", res);
      });
    }

    




    return Response;
  });
