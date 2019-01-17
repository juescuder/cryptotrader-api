'use strict';

var cors = require('cors');

module.exports = function(app) {
  var exchange = require('../controller/exchangeController');

  app.use(cors());
  
  // todoList Routes
  app.route('/exchange/coin/:symbol')
    .get(exchange.coin)
};