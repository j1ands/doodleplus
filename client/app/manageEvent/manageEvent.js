'use strict';

angular.module('doodleplusApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('manageEvent', {
        url: '/manageEvent',
        templateUrl: 'app/manageEvent/manageEvent.html',
        controller: 'ManageEventCtrl'
      });
  });