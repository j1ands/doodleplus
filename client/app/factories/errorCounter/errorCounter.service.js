'use strict';

angular.module('doodleplusApp')
  .factory('errorCounter', function () {
    // Service logic
    // ...
	var count = {};
	count.val = 0;

    // Public API here
    return {
      get: function () {
        return count.val;
      },
      set: function(v) {
	count.val = v;
      }
    };
  });
