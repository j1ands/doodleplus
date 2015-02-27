'use strict';

describe('Service: errorCountTwo', function () {

  // load the service's module
  beforeEach(module('doodleplusApp'));

  // instantiate service
  var errorCountTwo;
  beforeEach(inject(function (_errorCountTwo_) {
    errorCountTwo = _errorCountTwo_;
  }));

  it('should do something', function () {
    expect(!!errorCountTwo).toBe(true);
  });

});
