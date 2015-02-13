'use strict';

angular.module('doodleplusApp')
  .controller('ManageEventCtrl', function ($scope, $stateParams, storeEvent, Time, Response, responseChartData) {
    
    var responseArray = [];
    $scope.responses = [];
    $scope.days = [];

    $scope.isDays = {
        value: false
    };
    $scope.$watch("days", function(newVal, oldVal){
        if(newVal.length){
            $scope.isDays.value = true;
        }
    })

var eventID = $stateParams.event_id;

responseChartData.generateResponseData(eventID)
                    .then (function(days){
                        $scope.days = days.days;
                        console.log(days)
                    });


    $scope.respondents = [];



    $scope.pullData = function(response){
    	$scope.responses = [];
        $scope.responses = response;
    	$scope.$apply();
    };

  });


// -authenticated - login
// -list of different events a user has; nearest starting date first
// -past events??


// -manage events:
// --add more times
// --link to recreate/update event page
// --add more ppl to invite
// --close out the event
