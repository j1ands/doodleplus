'use strict';

describe('Controller: EventResponseCtrl', function () {

  // load the controller's module
  beforeEach(module('doodleplusApp'));

  var EventResponseCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventResponseCtrl = $controller('EventResponseCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
