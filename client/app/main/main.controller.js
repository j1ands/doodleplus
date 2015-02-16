'use strict';

angular.module('doodleplusApp')
 .controller('MainCtrl', function ($scope, $location, storeEvent) {
    $scope.createEvent = function (eventTitle) {
      storeEvent.event.title = eventTitle;
      $location.path('/createEvent');
    }
    
    //$scope.user = Auth.getCurrentUser();

  });
