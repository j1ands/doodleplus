'use strict';

angular.module('doodleplusApp')
  .factory('errorCountTwo', function () {
    var count = {};
    count.val = 0;

    return {
      get: function () {
        return count.val;
      },
      set: function (v) {
	count.val = v;
      }	
    };
  });
