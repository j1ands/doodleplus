'use strict';

angular.module('doodleplusApp')
  .factory('storeEvent', function ($resource) {
      return $resource('/api/events/:id',{id: '@id'});
    });
