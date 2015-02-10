'use strict';

angular.module('doodleplusApp')
  .controller('ManageEventCtrl', function ($scope, $stateParams, storeEvent, Time, Response) {
    $scope.responses = [];

    $scope.pullData = function(response){
    	$scope.responses = [];
    	$scope.responses = response;
    	$scope.$apply();
    };

    $scope.event_id = $stateParams.event_id;

    $scope.getEvent = function(eventID) {
        storeEvent.getEvent(eventID, function() {
            $scope.event = storeEvent.event;
            $scope.times = storeEvent.event.Times;
            Time.organizeByDay($scope.times);
            $scope.days = Time.days;
            console.log(Time.days)
        });
    }

    $scope.getEvent($stateParams.event_id);

  });


// -authenticated - login
// -list of different events a user has; nearest starting date first
// -past events??


// -manage events:
// --add more times
// --link to recreate/update event page
// --add more ppl to invite
// --close out the event
