'use strict';

angular.module('doodleplusApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'state': 'main'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.createEvent = function() {
      $location.path('/createEvent');
    }

    if ($location.url() !== "/") {
      $('.navbar').addClass('navbar-sitewide');
    }

    $scope.$on('$locationChangeStart', function() {
      if ($location.url() !== "/") {
       $('.navbar').addClass('navbar-sitewide');
      } else $('.navbar').removeClass('navbar-sitewide');
    });
  });
