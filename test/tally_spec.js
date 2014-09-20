var expect = require('chai').expect,
    fs = require('fs'),
    path = require('path');

/* Helper functions */
var fixtureDir = path.resolve(__dirname, 'fixtures');
function fromFile(filepath, callback) {
  fs.readFile(path.resolve(fixtureDir, filepath), function (err, data) {
    if (err) throw err;
    callback(JSON.parse(data));
  });
}

/* Tests */
describe('#tally()', function() {
  var tally = require('../src/tally');
  
  describe('basic structure', function() {
    
    it('should be a function', function(done) {
      expect(tally).to.be.a('function');
      done();
    });

    it('should return an object', function(done) {
      fromFile('fptp/valid_01.json', function(input) {
        expect(tally(input)).to.be.a('object');
        done();
      });
    });
    
    it('should throw an error if invalid election type', function(done) {
      fromFile('fptp/valid_01.json', function(input) {
        input.type = "invalid_election_type";
        expect(function() { tally(input) }).to.throw(Error);
        done();
      });
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

describe('#tally.utils', function() {
  var utils = require('../src/tally').utils;
  
  describe('.count', function() {
  	var count = utils.count;
    
    it('should count instances of each item', function(done) {
      expect(count([])).to.deep.equal([]);
      expect(count(['a'])).to.deep.equal([{ candidate: "a", votes: 1}]);
      expect(count(['a', 'b', 'b', null, 'c'])).to.deep.equal([
        { candidate: "b", votes: 2 },
        { candidate: "a", votes: 1 },
        { candidate: "c", votes: 1 },
        { candidate: null, votes: 1 }
      ]);
      done();
    });
    
  });
  
});

describe('#tally.methods.fptp', function() {
  var FPTP = require('../src/tally').methods.FPTP;
  
  describe('.ballotValidator', function() {
    var validator = FPTP.ballotValidator;
    
    it('should yield a function from a list of candidates', function(done) {
      expect(validator(['a', 'b'])).to.be.a('function');
      done();
    });
    
    it('should yield null if ballot is not for a single candidate', function(done) {
      expect(validator(['a', 'b'])([])).to.be.null;
      expect(validator(['a', 'b'])(['a', 'b'])).to.be.null;
      done();
    });
    
    it('should yield null if ballot does not contain a listed candidate', function(done) {
      expect( validator(['a','b'])(['c']) ).to.be.null;
      done();
    });
    
    it('should yield candidate if valid vote', function(done) {
      expect( validator(['a','b'])(['a']) ).to.equal('a');
      expect( validator(['a','b'])(['b']) ).to.equal('b');
      done();
    });
    
  });
  
});