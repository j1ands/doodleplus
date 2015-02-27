'use strict';

angular.module('doodleplusApp')
  .factory('errorCountTwo', function () {
    var count = {};

    return {
      get: function () {
        return count.val == undefined ? 0 : count.val;
      },
      set: function (v) {
	count.val = v;
      }	
    };
  });
