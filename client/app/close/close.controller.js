'use strict';

angular.module('doodleplusApp')
  .controller('CloseCtrl', function ($scope, $window) {
  	$window.close();
    $scope.message = 'Hello';
  });
