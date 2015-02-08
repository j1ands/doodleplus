'use strict';

angular.module('doodleplusApp')
  .controller('MainCtrl', function($scope, $location, Auth, $http) {
    $scope.createEvent = function() {
      $location.path('/createEvent');
    }

    $scope.user = Auth.getCurrentUser();

    // $scope.user.$promise.then(function(u)
    // {
    // 	$http.get('https://www.google.com/m8/feeds/contacts/' + u.email + '/full')
    // 		.success(function(data){
    // 			debugger;
    // 			console.log(data);
    // 			$scope.user = data;
    // 		})
    // 		.error(function(data){
    // 			debugger;
    // 			console.log(data);
    // 		});
    // });
});
