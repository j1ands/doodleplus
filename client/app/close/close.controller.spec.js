'use strict';

describe('Controller: CloseCtrl', function () {

  // load the controller's module
  beforeEach(module('doodleplusApp'));

  var CloseCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CloseCtrl = $controller('CloseCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
