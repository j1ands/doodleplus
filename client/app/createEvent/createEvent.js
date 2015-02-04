'use strict';

angular.module('doodleplusApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('createEvent', {
        url: '/createEvent',
        templateUrl: 'app/createEvent/createEvent.html',
        controller: 'CreateEventCtrl as CreateEvent'
      });
  });