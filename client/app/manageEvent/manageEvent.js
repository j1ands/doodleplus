'use strict';

angular.module('doodleplusApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('manageEvent', {
	      url: '/manageEvent/:event_id/:user_id',
        templateUrl: 'app/manageEvent/manageEvent.html',
        controller: 'ManageEventCtrl as Manage'
      });
  });
