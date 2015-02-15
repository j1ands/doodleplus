'use strict';

angular.module('doodleplusApp')
  .factory('storeEvent', function ($resource, Auth) {

  	var storeEvent = $resource('/api/events/:id',{id: '@id'}, {
  		update: {
  			method: 'PUT'
  		}
  	});

  	storeEvent.getEvent = function(eventID, UUID, isAdmin, isRespondee, func) {
      		var oldResponses = [];
  	      var username;
	      var manage = isAdmin;
		var response = isRespondee;
		var eventObj = {};
		if(isAdmin){
			eventObj.event_id = eventID.event_id;
			eventObj.user_id = eventID.user_id;
		} else {
			eventObj.event_id = eventID;
		}
	        storeEvent.get({id: eventObj.event_id}, function(thisEvent) {
			if(manage){
				if(eventObj.user_id == thisEvent.UserId){
					storeEvent.event = thisEvent;
				}
			} else {
				storeEvent.event = thisEvent;
				if(response){
					thisEvent.UserId = null;
				}
			}
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
  	}

    return storeEvent;

  });
