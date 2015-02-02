'use strict';

angular.module('doodleplusApp')
  .controller('EventResponseCtrl', function ($scope, $stateParams) {
    var event_id = $stateParams.event_id;

    $scope.days = [
    	{
    		day: "Monday",
    		times: ["8:00 PM", "8:30 PM", "9:00 PM" , "9:30 PM"]
    	}
    ]

    $scope.select = function(res) {

    }
  });
