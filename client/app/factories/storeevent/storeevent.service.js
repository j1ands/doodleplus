'use strict';

angular.module('doodleplusApp')
  .factory('storeevent', function ($resource) {
      return $resource('/api/events');
    });
