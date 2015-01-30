'use strict';

angular.module('doodleplusApp')
  .controller('CreateEventCtrl', function ($scope, storeevent) {
    $scope.message = function(){
      console.log('hi');
    }
    $scope.invitedEmails = [];
    $scope.eventOptions = {};
    $scope.userOptions = {};
    $scope.timeOptions = {};

    $scope.storeEvent = function()
    {
      storeevent.save(
        {
          event: $scope.eventOptions,
          user: $scope.userOptions,
          time: $scope.timeOptions
        }, function(something)
        {
          console.log(something);
        })
    }

    $scope.addEmail = function(){
      if ($scope.emailToAdd){
        $scope.invitedEmails.push($scope.emailToAdd);
      }
    }
  });
