'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var responseCtrlStub = {
  index: 'responseCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var responseIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './response.controller': responseCtrlStub
});

describe('Response API Router:', function() {

  it('should return an express router instance', function() {
    responseIndex.should.equal(routerStub);
  });

  describe('GET /api/responses', function() {

    it('should route to response.controller.index', function() {
      routerStub.get
                .withArgs('/', 'responseCtrl.index')
                .should.have.been.calledOnce;
    });

  });

});
