(function(done) {
  
  var utils = {};
  
  // Returns count for each item
  // ie. count(["a","b","b", null]) = { null: 1, "a": 1, "b": 2 }
  utils.count = function(items) {
    var result = {}
    items.forEach(function(element, index, array) {
      result[element] = result.hasOwnProperty(element) ? result[element] + 1 : 1;
    });
    return result;
  }
  
  // Voting Methods
  var methods = {};
  
  // First Past the Post method
  methods.FPTP = (function IIFE() {
    // Remove invalid ballots, and turn valid ballots into single candidate
  	var ballotValidator = function(candidates) {
      return function(ballot) {
        // return the selected candidate, or null if invalid
        if (ballot.length == 1 && candidates.indexOf(ballot[0]) != -1)
          return ballot[0];
        else
          return null;
      }
    };
    
    var method = function(options, candidates, ballots) {
      // Compact and count ballots
      var tally = utils.count(ballots.map( ballotValidator(candidates) ));
      // TODO: Declate highest non-null candidate from tally the winner
      return {};
    };
    
    // Export for testing
    method.ballotValidator = ballotValidator;
    
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