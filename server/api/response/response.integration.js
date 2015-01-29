'use strict';

var app = require('../../app');
var request = require('supertest');

describe('Response API:', function() {

  describe('GET /api/responses', function() {
    var responses;

    beforeEach(function(done) {
      request(app)
        .get('/api/responses')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          responses = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      responses.should.be.instanceOf(Array);
    });

  });

});
