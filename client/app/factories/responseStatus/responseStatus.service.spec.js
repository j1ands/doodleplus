'use strict';

describe('Service: responseStatus', function () {

  // load the service's module
  beforeEach(module('doodleplusApp'));

  // instantiate service
  var responseStatus;
  beforeEach(inject(function (_responseStatus_) {
    responseStatus = _responseStatus_;
  }));

  it('should do something', function () {
    expect(!!responseStatus).toBe(true);
  });

});
