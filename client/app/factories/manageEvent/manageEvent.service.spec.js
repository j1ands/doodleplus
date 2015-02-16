'use strict';

describe('Service: manageEvent', function () {

  // load the service's module
  beforeEach(module('doodleplusApp'));

  // instantiate service
  var manageEvent;
  beforeEach(inject(function (_manageEvent_) {
    manageEvent = _manageEvent_;
  }));

  it('should do something', function () {
    expect(!!manageEvent).toBe(true);
  });

});
