'use strict';

angular.module('doodleplusApp')
  .controller('MainCtrl', function($scope, $location) {
    $scope.createEvent = function() {
      $location.path('/createEvent');
    }

  });
