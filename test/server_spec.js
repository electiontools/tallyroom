var expect = require('chai').expect,
    _ = require('underscore');

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
    
  });
  
  describe('First Past The Post', function() {
    
    it.skip('should yield correct result in elections with invalid ballots', function(done) {
      fromFile('fptp/valid_01.json', function(input) {
        // Put stuff here! :-)
        // Have you decided on the property used to designate the winner(s)?
        var result = tally(input);
        expect(result.verdict).to.deep.equal(['a']); // Agreee ? 
        // 'a' == 'a', but ['a'] != ['a']
      });
      done();
    });
    
  });
  
});