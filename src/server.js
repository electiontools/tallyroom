var express = require('express'),
    bodyParser = require('body-parser'),
    Q = require('q');

var server = function(tally) {
  
  var app = express();
  
  app.use(bodyParser.json());

  app.get('/', function(req, res) {
    res.send('You need to POST an election to get a result.');
  });

  app.post('/', function(req,res) {
    if (req.is('json')) {
      try {
        var result = tally(req.body);
        res.format({
          // JSON
          'application/json': function() {
            res.json(result);
          }
        });
      } catch(e) {
        res.status(400).send('Elections are provided using JSON.');
      }
    } else {
      res.status(400).send('Elections are provided using JSON.');
    }
  });
  
  var runtime = function(options) {
    var options = options || {},
  	    port = options.port || 0;
    
    var d = Q.defer();
    
    var server = app.listen(port, function() {
      console.log('Listening on port %d', server.address().port);
      return d.resolve(server);
    });
    
    return d.promise;
  };
  
  // Attach the app so it can be extended
  runtime.app = app;
  
  return runtime;
};

module.exports = server;
