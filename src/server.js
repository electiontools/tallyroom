var express = require('express'),
    bodyParser = require('body-parser');

var server = function(tally) {
  
  var app = express();
  
  app.use(bodyParser.json());

  app.get('/', function(req, res) {
    res.send('You need to POST an election to get a result.');
  });

  app.post('/', function(req,res) {
    if (req.is('json')) {
      var result = tally(req.body);
      res.format({
        // JSON
        'application/json': function() {
          res.json(result);
        }
      })
    } else {
      res.status(405).send('Elections are provided using JSON.');
    }
  });
  
  var runtime = function(options) {
  	var port = options.port || 3000;
    
    var server = app.listen(port, function() {
      console.log('Listening on port %d', server.address().port);
    });
    
  };
  
  // Attach the app so it can be extended
  runtime.app = app;
  
  return runtime;
};

module.exports = server;
