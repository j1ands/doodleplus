'use strict';

describe('Service: responseChartData', function () {

  // load the service's module
  beforeEach(module('doodleplusApp'));

  // instantiate service
  var responseChartData;
  beforeEach(inject(function (_responseChartData_) {
    responseChartData = _responseChartData_;
  }));

  it('should do something', function () {
    expect(!!responseChartData).toBe(true);
  });

});
