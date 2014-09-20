(function(done) {
  if (typeof(_) == 'undefined') {
    var _ = require('underscore');
  }
  
  var utils = {};
  
  // Returns count for each item, sorted by most to least votes, then alphabetical order
  // ie. count(["a","b","b", null]) => [
  // 		{ candidate: "b", votes: 2},
	// 		{ candidate: null, votes: 1},
  // 		{ candidate: "a", votes: 1},
  // ]
  utils.count = function(items) {
    function sortByCandidate(tallys) {
      var sortedCandidates = _(tallys).pluck('candidate').sort();
      return _(tallys).sortBy(function(x) { return sortedCandidates.indexOf(x.candidate); });
    }
    var result = [];
    items.forEach(function(element, index, array) {
      var candidateTally = _(result).find(function(k) { return k.candidate == element; });
      if (candidateTally == null) {
        // element doesn't have an entry yet
        result.push( { candidate: element, votes : 1 } );
      } else {
        candidateTally.votes += 1;
      }
    });
    return _.sortBy(sortByCandidate(result), function(candidateTally) {
      return -candidateTally.votes
    });
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
      return {
        verdict: [] // TODO: Fill this in
      };
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