'use strict';

angular.module('doodleplusApp')
  .controller('EventResponseCtrl', function ($scope, $stateParams, storeEvent, Time, Response, Auth) {

  	$scope.mouseDown = false;
  	$scope.responses = [];
  	$scope.days = [];
    $scope.username;
    $scope.oldResponses = [];

    var event_id = $stateParams.event_id;

    var setEventDetails = function(thisEvent, username, oldResponses) {
      $scope.event = thisEvent;
      $scope.times = thisEvent.times;
      Time.organizeByDay($scope.times);
      $scope.days = Time.days;
      $scope.username = username;
      $scope.oldResponses = oldResponses;
    }

    $scope.getEvent = function(eventID, UUID) {
      storeEvent.getEvent(eventID, UUID, setEventDetails);
    }

    var setUUID = function(obj) {
      $scope.UUID = obj.UUID;
      $scope.getEvent($stateParams.event_id, $scope.UUID);
    }

    if (Auth.getToken()) {
      Auth.getCurrentRespondee(setUUID)
    } else Auth.createRespondee(setUUID);


    $scope.submitResponses = function() {
      Response.saveResponses($scope.username, $scope.UUID, $scope.oldResponses, setEventDetails); 
    }

    $scope.select = function(time, response) {
    	$scope.mouseDown = true;
    	if(time.status === response) {
    		time.status = "removed";
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

