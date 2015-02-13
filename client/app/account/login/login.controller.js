'use strict';

angular.module('doodleplusApp')
  .controller('LoginCtrl', function($scope, Auth, $state, $window, $cookieStore) {
    $scope.user = {};
    $scope.errors = {};

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
      debugger;
      var x = $cookieStore.get('user');
      var location = '/connect/' + provider + "?user=" + x +"&event=" + eventId;
      $window.location.href = location;
    };
  });
