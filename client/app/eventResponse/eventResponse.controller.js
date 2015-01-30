'use strict';

angular.module('doodleplusApp')
  .controller('EventResponseCtrl', function ($scope, $stateParams) {
    var event_id = $stateParams.event_id;

    $scope.days = [
    	{
    		day: "Monday",
    		times: ["8:00", "8:30", "9:00" , "9:30"]
    	}
    ]
  });
