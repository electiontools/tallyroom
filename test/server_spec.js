var expect = require('chai').expect,
    _ = require('underscore'),
    request = require('supertest');

/* Tests */
describe('#server()', function() {
  var server = require('../src/server');
  
  describe('basic structure', function() {
    
    it('should be a function', function(done) {
      expect(server).to.be.a('function');
      done();
    });

    it('should return a function', function(done) {
      expect(server(_.identity)).be.a('function');
      done();
    });
    
    it('should start the server, returning a promise resolved when it is started', function(done) {
      var running = server(_.identity)();
      running.then(function(app) {
        expect(app.address().port).to.be.within(1,65525);
        app.close();
      	done();
      });
    });
    
  });
  
  it('requires JSON POSTs', function(done) {
    var app = server(_.identity).app;
    request(app)
    	.post('/')
      .send({})
    	.expect(200, done);
  });
  
  it('responds with 400 when POST does not contain JSON', function(done) {
    var app = server(_.identity).app;
    request(app)
    	.post('/')
    	.expect(400, done);
  });
  
  it('responds with 400 when an error is thrown', function(done) {
    var app = server(function() { throw new Error("Test") }).app;
    request(app)
      .post('/')
      .send({})
      .expect(400, done)
  });
  
});