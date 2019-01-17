var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

var routes = require('./api/route/route');
routes(app);

app.listen(port);

console.log('Cryptotrader API started on port: ' + port);