'use strict';

describe('Controller: GoogleCtrl', function () {

  // load the controller's module
  beforeEach(module('doodleplusApp'));

  var GoogleCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GoogleCtrl = $controller('GoogleCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
