'use strict';

angular.module('doodleplusApp')
  .controller('LoginCtrl', function($scope, Auth, $state, $window, $cookieStore, $stateParams, $http) {
    $scope.user = {};
    $scope.errors = {};
    $scope.eventid = $stateParams.eventid;

    $scope.login = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function() {
          // Logged in, redirect to home
          $state.go('main');
        })
        .catch(function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider, eventId) {
      var x = $cookieStore.get('user');
      var location = '/connect/' + provider + "?user=" + x +"&event=" + eventId;
      // $http.get(location)
      //   .success(function(data)
      //   {
      //     debugger;
      //   })
      //   .error(function(data)
      //   {
      //     debugger;
      //   });

      $window.open(location);      
      //$window.location.href = location;
      //$window.open('/' + provider + '/' + eventId);
    };

  });
