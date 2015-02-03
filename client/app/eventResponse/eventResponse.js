'use strict';

angular.module('doodleplusApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('eventResponse', {
        url: '/event/:event_id',
        templateUrl: 'app/eventResponse/eventResponse.html',
        controller: 'EventResponseCtrl'
      });
  });