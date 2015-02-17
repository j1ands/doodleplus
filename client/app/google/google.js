'use strict';

angular.module('doodleplusApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('google', {
        url: '/google/:eventid',
        templateUrl: 'app/google/google.html',
        controller: 'GoogleCtrl'
      });
  });