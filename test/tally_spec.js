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
    
  });
  
  describe('First Past The Post', function() {
    
    it('should yield correct result in elections with invalid votes');
    
  });
  
});