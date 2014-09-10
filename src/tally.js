(function(done) {
  
  var tallyFunc = function() {
    
  };
  
  // Export tally function
  done(tallyFunc);
})(function(f) { typeof exports === 'undefined'? this['tally']=f: module.exports=f });