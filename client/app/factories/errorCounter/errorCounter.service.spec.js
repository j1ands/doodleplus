'use strict';

describe('Service: errorCounter', function () {

  // load the service's module
  beforeEach(module('doodleplusApp'));

  // instantiate service
  var errorCounter;
  beforeEach(inject(function (_errorCounter_) {
    errorCounter = _errorCounter_;
  }));

  it('should do something', function () {
    expect(!!errorCounter).toBe(true);
  });

});
