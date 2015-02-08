'use strict';

angular.module('doodleplusApp')
  .controller('EventResponseCtrl', function ($scope, $stateParams, storeEvent, Time, Response, Auth) {

  	$scope.mouseDown = false;
  	$scope.responses = [];
  	$scope.days = [];
    $scope.username;
    $scope.oldResponses = [];

    var setUUID = function(obj) {
        $scope.UUID = obj.UUID;
    }

    if (Auth.getToken()) {
      Auth.getCurrentRespondee(setUUID)
    } else Auth.createRespondee(setUUID);


    $scope.submitResponses = function() {
      Response.saveResponses($scope.username, $scope.UUID, $scope.oldResponses); 
    }

    var event_id = $stateParams.event_id;

    $scope.getEvent = function(eventID) {
    	storeEvent.getEvent(eventID, function() {
	    	$scope.event = storeEvent.event;
	    	$scope.times = storeEvent.event.times;
        $scope.times.forEach(function(time) {
          time.responses.forEach(function(response) {
            if (response.UUID === $scope.UUID) {
              $scope.username = response.username;
              $scope.oldResponses.push(response);
              time.status = response.status;
              time[response.status] = true;
            }
          })
        });
        console.log("old times", $scope.oldResponses);
        Time.organizeByDay($scope.times);
        $scope.days = Time.days;


    	});
    }

    $scope.getEvent($stateParams.event_id);


    $scope.select = function(time, response) {
    	$scope.mouseDown = true;
    	if(time.status === response) {
    		time.status = null;
    		time[response] = false;
    	} else {
    		time.able = false;
    		time.ifneedbe = false;
    		time.maybe = false;
    		time.status = response;
    		time[response] = true;
    	}
    }

	  $scope.resetMouse = function() {
	  	$scope.mouseDown = false;
	  }

	  $scope.checkClick = function(time, response) {
	  	if ($scope.mouseDown === true) {
	  		time.able = false;
    		time.ifneedbe = false;
    		time.maybe = false;
    		time.status = response;
    		time[response] = true;
	  	}
	  }


  });

