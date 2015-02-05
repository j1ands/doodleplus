'use strict';

describe('Service: response', function () {

  // load the service's module
  beforeEach(module('doodleplusApp'));

  // instantiate service
  var response;
  beforeEach(inject(function (_response_) {
    response = _response_;
  }));

  it('should do something', function () {
    expect(!!response).toBe(true);
  });

});
