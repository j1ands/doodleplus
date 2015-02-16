'use strict';

describe('Directive: indivStatusChart', function () {

  // load the directive's module
  beforeEach(module('doodleplusApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<indiv-status-chart></indiv-status-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the indivStatusChart directive');
  }));
});