'use strict';

angular.module('doodleplusApp')
  .controller('EventResponseCtrl', function ($scope, $stateParams) {

  	$scope.mouseDown = false;

    var event_id = $stateParams.event_id;

    $scope.days = [
    	{
    		day: "Monday",
    		times: [{value: "8:00 PM", status: "unable", able: false, ifneedbe: false, maybe: false}, 
    						{value: "8:30 PM", status: "unable"}, 
    						{value: "9:00 PM", status: "unable"}, 
    						{value: "9:30 PM", status: "unable"},
    						{value: "10:00 PM", status: "unable"}
    						]
    	}
    ]

    $scope.select = function(time, response) {
    	$scope.mouseDown = true;
    	if(time.status === response) {
    		time.status = "unable";
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

