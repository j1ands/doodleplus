'use strict';

angular.module('doodleplusApp')
  .factory('storeEvent', function ($resource, Auth) {

  	var storeEvent = $resource('/api/events/:id',{id: '@id'}, {
  		update: {
  			method: 'PUT'
  		}
  	});

  	storeEvent.getEvent = function(eventID, func) {
      if (Auth.getToken) {
        storeEvent.get({id: eventID}, function(myEvent) {
          storeEvent.event = myEvent;
          func();
        })
        // get event AND responses
      } else {
    		storeEvent.get({id: eventID}, function(myEvent) {
    			storeEvent.event = myEvent;
    			func();
    		})
      }
  	}




    return storeEvent;

  });
