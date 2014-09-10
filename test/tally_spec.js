var expect = require('chai').expect;
describe('#tally()', function() {
  var tally = require('../src/tally');

  it('should be a function', function(done) {
    expect(tally).to.be.a('function');
    done();
  });
});