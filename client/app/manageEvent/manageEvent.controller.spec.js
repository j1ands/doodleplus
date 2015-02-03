'use strict';

describe('Controller: ManageEventCtrl', function () {

  // load the controller's module
  beforeEach(module('doodleplusApp'));

  var ManageEventCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageEventCtrl = $controller('ManageEventCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
