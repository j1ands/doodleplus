'use strict';

describe('Service: dayTime', function () {

  // load the service's module
  beforeEach(module('doodleplusApp'));

  // instantiate service
  var dayTime;
  beforeEach(inject(function (_dayTime_) {
    dayTime = _dayTime_;
  }));

  it('should do something', function () {
    expect(!!dayTime).toBe(true);
  });

});
