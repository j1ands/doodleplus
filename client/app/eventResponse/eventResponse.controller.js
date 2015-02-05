'use strict';

angular.module('doodleplusApp')
  .controller('EventResponseCtrl', function ($scope, $stateParams, storeEvent, Time, Response) {

  	$scope.mouseDown = false;
  	$scope.responses = [];
  	$scope.days = [];
    $scope.username;

    Response.getOrCreateUUID();

    $scope.submitResponses = function() {
      Response.saveResponses($scope.username); 
    }

    var event_id = $stateParams.event_id;

    $scope.getEvent = function(eventID) {
    	storeEvent.getEvent(eventID, function() {
	    	$scope.event = storeEvent.event;
	    	$scope.times = storeEvent.event.Times;
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

