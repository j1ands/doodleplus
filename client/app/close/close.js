'use strict';

angular.module('doodleplusApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('close', {
        url: '/close',
        templateUrl: 'app/close/close.html',
        controller: 'CloseCtrl'
      });
  });