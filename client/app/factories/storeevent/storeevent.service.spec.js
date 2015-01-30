'use strict';

describe('Service: storeevent', function () {

  // load the service's module
  beforeEach(module('doodleplusApp'));

  // instantiate service
  var storeevent;
  beforeEach(inject(function (_storeevent_) {
    storeevent = _storeevent_;
  }));

  it('should do something', function () {
    expect(!!storeevent).toBe(true);
  });

});
