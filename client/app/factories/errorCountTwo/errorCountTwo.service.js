'use strict';

angular.module('doodleplusApp')
  .factory('errorCountTwo', function () {
    	var service = {};
	service.count = 0;
    	return  {
		get: function() {
			return service.count;
		},
	  	set: function(v) {
			service.count = v;
		}
	}
  });
