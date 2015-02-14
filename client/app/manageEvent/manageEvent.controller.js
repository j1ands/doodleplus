'use strict';

angular.module('doodleplusApp')
.controller('ManageEventCtrl', function ($scope, $stateParams, storeEvent, Time, Response, responseChartData) {

    $scope.responses = [];
    $scope.days = [];
    $scope.currentIndex = 0;
    $scope.isDays = {
        value: false
    };


    $scope.$watch("days", function(newVal, oldVal){
        if(newVal.length){
            $scope.isDays.value = true;
            console.log($scope.days)
            $scope.eventTitle = $scope.days[0].eventTitle;
        }
    })

    var eventID = $stateParams.event_id;

    responseChartData.generateResponseData(eventID)
        .then (function(days){
            $scope.days = days.days;
            $scope.responses = []
            days.days.forEach(function(elem,idx){
                $scope.responses[idx] = [];
            })
            // console.log('response',$scope.responses);
    });


    $scope.respondents = [];

    $scope.pullData = function(response){
        console.log('pullData response',response);
        $scope.responses[$scope.currentIndex] = response; //this doesn't set until you select a time within a day
        $scope.$apply();
    };

    $scope.changeDay = function(curInd,selInd){
        console.log('curInd',curInd,'selInd',selInd);
        $scope.currentIndex = curInd;
        console.log('responses',$scope.responses[$scope.currentIndex]);
    }

});


// -authenticated - login
// -list of different events a user has; nearest starting date first
// -past events??


// -manage events:
// --add more times
// --link to recreate/update event page
// --add more ppl to invite
// --close out the event
