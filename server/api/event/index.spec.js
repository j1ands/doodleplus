'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var eventCtrlStub = {
  index: 'eventCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var eventIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './event.controller': eventCtrlStub
});

describe('Event API Router:', function() {

  it('should return an express router instance', function() {
    eventIndex.should.equal(routerStub);
  });

  describe('GET /api/events', function() {

    it('should route to event.controller.index', function() {
      routerStub.get
                .withArgs('/', 'eventCtrl.index')
                .should.have.been.calledOnce;
    });

  });

});
