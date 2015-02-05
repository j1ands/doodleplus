'use strict';

angular.module('doodleplusApp')
  .controller('ManageEventCtrl', function ($scope) {
    $scope.responses = [];

    $scope.pullData = function(response){
    	$scope.responses = [];
    	$scope.responses = response;
    	$scope.$apply();
    }
    // rootscope.$on('responseData',function(theResponseData){
    // 	$scope.responses = theResponseData;
    // })
  });


// -authenticated - login
// -list of different events a user has; nearest starting date first
// -past events??


// -manage events:
// --add more times
// --link to recreate/update event page
// --add more ppl to invite
// --close out the event
