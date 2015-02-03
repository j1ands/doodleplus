'use strict';

angular.module('doodleplusApp')
  .factory('storeEvent', function ($resource) {

  	var storeEvent = $resource('/api/events/:id',{id: '@id'}, {
  		update: {
  			method: 'PUT'
  		}
  	});

  	storeEvent.getEvent = function(eventID, func) {
  		storeEvent.get({id: eventID}, function(myEvent) {
  			storeEvent.event = myEvent;
  			func();
  		})
  	}




    return storeEvent;

  });
