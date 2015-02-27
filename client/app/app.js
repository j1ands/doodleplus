'use strict';

angular.module('doodleplusApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'd3',
  'gm.datepickerMultiSelect',
  'ngMaterial',
  'ngTouch',
  'ng-mfb'
])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider) {
  $mdThemingProvider.definePalette('gRed', {
      '50': 'c23321',
      '100': 'c23321',
      '200': 'c23321',
      '300': 'c23321',
      '400': 'c23321',
      '500': 'c23321',
      '600': 'c23321',
      '700': 'c23321',
      '800': 'c23321',
      '900': 'c23321',
      'A100': 'c23321',
      'A200': 'c23321',
      'A400': 'c23321',
      'A700': 'c23321',
  	'contrastDefaultColor': 'light',
  	'contrastDarkColors': ['50','100','200','300','400','A100'],
  	'contrastLightColors': undefined
  });

  $mdThemingProvider.theme('google')
	  .primaryPalette('gRed')
	  .accentPalette('red');

    $mdThemingProvider.theme('default')
      .primaryPalette('green')
      .accentPalette('deep-purple');

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function($rootScope, $q, $cookieStore, $injector, errorCounter) {
    var state;
    return {
      // Add authorization token to headers
      request: function(config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('usertoken')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('usertoken');
        }
        return config;
      },
  	response: function(response) {
		errorCounter.count = 0;
		return response;
	},
      // Intercept 401s and redirect you to main
      responseError: function(response) {
        if (response.status === 401) {
		debugger;
		if(errorCounter.count == 1) {
			errorCounter.count = 0;
			location.href = "/";
		} else {
		errorCounter.count++;
          	location.reload(); //Reload page option
          
          	// remove any stale tokens
          	$cookieStore.remove('token');
          	$cookieStore.remove('usertoken');
          	return $q.reject(response);
		}
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function($rootScope, $state, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $state.go('login');
        }
      });
    });
  });
