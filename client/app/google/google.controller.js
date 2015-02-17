'use strict';

angular.module('doodleplusApp')
  .controller('GoogleCtrl', function ($scope, $stateParams, $cookieStore, $http) {
    $scope.message = 'Hello';
    console.log("HEYY");
    	debugger;

		var x = $cookieStore.get('user');
		var location = 'localhost/connect/google' + "?user=" + x +"&event=" + $stateParams.eventid;
		
		$http.get(location)
			.success(function(data)
			{
				debugger;
			})
			.error(function(data)
			{
				debugger;
			});
  });
