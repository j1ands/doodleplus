'use strict';

var app = require('../../app');
var request = require('supertest');

describe('Event API:', function() {

  describe('GET /api/events', function() {
    var events;

    beforeEach(function(done) {
      request(app)
        .get('/api/events')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          events = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      events.should.be.instanceOf(Array);
    });

  });

});
