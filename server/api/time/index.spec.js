'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var timeCtrlStub = {
  index: 'timeCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var timeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './time.controller': timeCtrlStub
});

describe('Time API Router:', function() {

  it('should return an express router instance', function() {
    timeIndex.should.equal(routerStub);
  });

  describe('GET /api/times', function() {

    it('should route to time.controller.index', function() {
      routerStub.get
                .withArgs('/', 'timeCtrl.index')
                .should.have.been.calledOnce;
    });

  });

});
