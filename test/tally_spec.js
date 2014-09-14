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
    
    it('should yield correct result in elections with invalid ballots');
    
  });
  
});

describe('#tally.utils', function() {
  var utils = require('../src/tally').utils;
  
  describe('.count', function() {
  	var count = utils.count;
    
    // TODO: Skipping - make this pass!
    it.skip('should count instances of each item', function(done) {
      expect(count([])).to.deep.equal({});
      expect(count(['a'])).to.deep.equal({ "a": 1 });
      expect(count(['a', 'b', 'b'])).to.deep.equal({ "a": 1, "b": 2 });
      done();
    });
    
  });
  
});

describe('#tally.methods.fptp', function() {
  var FPTP = require('../src/tally').methods.FPTP;
  
  describe('.validator', function() {
    var validator = FPTP.validator;
    
    it('should yield a function from a list of candidates', function(done) {
      expect(validator(['a', 'b'])).to.be.a('function');
      done();
    });
    
    it('should yield null if not a single candidate');
    
    it('should yield null if not a given candidate');
    
    it('should yield candidate if valid vote');
    
  });
  
});