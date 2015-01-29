'use strict';

var app = require('../../app');
var request = require('supertest');

describe('Time API:', function() {

  describe('GET /api/times', function() {
    var times;

    beforeEach(function(done) {
      request(app)
        .get('/api/times')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          times = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      times.should.be.instanceOf(Array);
    });

  });

});
