'use strict';

describe('Controller: CreateEventCtrl', function () {

  // load the controller's module
  beforeEach(module('doodleplusApp'));

  var CreateEventCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateEventCtrl = $controller('CreateEventCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
