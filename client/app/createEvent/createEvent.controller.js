'use strict';

angular.module('doodleplusApp')
  .controller('CreateEventCtrl', function ($scope) {
    $scope.message = function(){
      console.log('hi');
    }
    $scope.invitedEmails = [];
    $scope.addEmail = function(){
      if ($scope.emailToAdd){
        $scope.invitedEmails.push($scope.emailToAdd);
      }
    }
  });
