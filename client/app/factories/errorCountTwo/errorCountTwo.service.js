'use strict';

angular.module('doodleplusApp')
  .factory('errorCountTwo', function () {
    	var count = 0;
    	var service = {};
    	service.get = function() {
	    return count;
    	}
    	service.set = function(v) {
	    count = v;
    	}
    	return service;
  });
