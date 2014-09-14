(function(done) {
  
  var utils = {};
  utils.count = function(items) {
    // TODO: return count for each item
    // ie. count(["a","b","b", null]) = { null: 1, "a": 1, "b": 2 }
    return {};
  }
  
  // Voting Methods
  var methods = {};
  
  // First Past the Post method
  methods.FPTP = (function IIFE() {
    // Remove invalid ballots, and turn valid ballots into single candidate
  	var validator = function(candidates) {
      return function() {
        // TODO: return candidate, or null if invalid
        return null;
      }
    };
    
    var method = function(options, candidates, ballots) {
      // Compact and count ballots
      var tally = utils.count(ballots.map( validator(candidates) ));
      // TODO: Declate highest non-null candidate from tally the winner
      return {};
    };
    
    // Export for testing
    method.validator = validator;
    
    return method;
  })();
  
  // Main Function
  var tallyFunc = function(election) {
    var method = methods[election.type];
    if (!method) {
      throw new Error("Unknown election type.");
    }
    // Pass to method - for starters we're forgiving about required parameters
    return method(
      election.options || {},
      election.candidates || [],
      election.ballots || []);
  };
  
  // Exports components for testing
  tallyFunc.utils = utils;
  tallyFunc.methods = methods;
  
  // Export tally function
  done(tallyFunc);
})(function(f) { typeof exports === 'undefined'? this['tally']=f: module.exports=f });