'use strict';

angular.module('doodleplusApp')
  .factory('errorCountTwo', function () {
    	var service = {count:0};
    	return  {
		get: function() {
			return service.count;
		},
	  	set: function(v) {
			service.count = v;
		}
	}
  });
