'use strict';

angular.module('doodleplusApp')
  .factory('storeEvent', function ($resource, Auth) {

  	var storeEvent = $resource('/api/events/:id',{id: '@id'}, {
  		update: {
  			method: 'PUT'
  		}
  	});

  	storeEvent.getEvent = function(eventID, UUID, func) {
      		var oldResponses = [];
  	      var username;
	        storeEvent.get({id: eventID}, function(thisEvent) {
      			storeEvent.event = thisEvent;
            thisEvent.times.forEach(function(time) {
              time.responses.forEach(function(response) {
                if (response.UUID === UUID) {
                  username = response.username;
                  oldResponses.push(response);
                  time.status = response.status;
                  time[response.status] = true;
                }
              })
            });
            if(func){
      			func(thisEvent, username, oldResponses);
          }
  		});
  	};

    return storeEvent;

  });
