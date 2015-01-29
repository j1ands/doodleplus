'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var emailCtrlStub = {
  index: 'emailCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var emailIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './email.controller': emailCtrlStub
});

describe('Email API Router:', function() {

  it('should return an express router instance', function() {
    emailIndex.should.equal(routerStub);
  });

  describe('GET /api/emails', function() {

    it('should route to email.controller.index', function() {
      routerStub.get
                .withArgs('/', 'emailCtrl.index')
                .should.have.been.calledOnce;
    });

  });

});
