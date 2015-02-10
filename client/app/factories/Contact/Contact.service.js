'use strict';

angular.module('doodleplusApp')
  .factory('Contact', function ($resource) {
    // Service logic
    // ...

    var contacts = $resource('/api/contacts/');

    // Public API here
    return contacts;
  });
