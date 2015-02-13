'use strict';

describe('Service: responseSocket', function () {

  // load the service's module
  beforeEach(module('doodleplusApp'));

  // instantiate service
  var responseSocket;
  beforeEach(inject(function (_responseSocket_) {
    responseSocket = _responseSocket_;
  }));

  it('should do something', function () {
    expect(!!responseSocket).toBe(true);
  });

});
