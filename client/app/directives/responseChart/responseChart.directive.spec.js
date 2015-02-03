'use strict';

describe('Directive: responseChart', function () {

  // load the directive's module and view
  beforeEach(module('doodleplusApp'));
  beforeEach(module('app/directives/responseChart/responseChart.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<response-chart></response-chart>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the responseChart directive');
  }));
});