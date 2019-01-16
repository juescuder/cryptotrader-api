'use strict';
module.exports = function(app) {
  var exchange = require('../controller/exchangeController');

  // todoList Routes
  app.route('/exchange/coin/:symbol')
    .get(exchange.coin)
};