'use strict';

angular.module('doodleplusApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      createRespondee: {
        method: 'POST',
        params: {
          id:'respondee'
        }
      },
      getRespondee: {
        method: 'GET',
        params: {
          id:'respondee'
        }
      }
	  });
  });
