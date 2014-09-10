(function(done) {
  
  var tallyFunc = function(election) {
    // TODO: return something other than the input!
    return election;
  };
  
  // Export tally function
  done(tallyFunc);
})(function(f) { typeof exports === 'undefined'? this['tally']=f: module.exports=f });