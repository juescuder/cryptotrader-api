'use strict';

var rxjs = require('rxjs');
var _ = require('underscore');
var async = require('async');

var s1 = require('../service/BinanceService');
var s2 = require('../service/BittrexService');
var s3 = require('../service/CryptopiaService');
var s4 = require('../service/PoloniexService');
var s5 = require('../service/CoinbaseService');
var s6 = require('../service/KrakenService');
var s7 = require('../service/BitfinexService');

var services = [s1, s2, s3, s4, s5, s6, s7];
var responses = [];

exports.coin = function(req, res) {

  var symbol = req.params.symbol;
  console.log('Symbol requested: ' + symbol);

  async.each(services, function(service, callback){

    service.getPrice(symbol).then(function(coin){
      console.log(coin);
      responses.push(coin);
      callback();      
    });

  }, function(err){

      var count = 0;
      var amount = 0;

      _.forEach(responses, x => {

        if(x.price != "N/A")
        {
          count++;
          amount = parseFloat(amount + (+parseFloat(x.price).toFixed(5)));
        }
      });

      var response = {
        symbol: symbol,
        average: parseFloat((amount / count).toFixed(5)),
        time : new Date().toUTCString(),
        exchanges : _.sortBy(responses, x => x.exchangeId)
      }

      _.forEach(response.exchanges, x => {
        if(x.price != "N/A")
          x.gap = ((x.price - response.average) * 100 / response.average).toFixed(3) + "%";
        else
          x.gap = "N/A";
      });

      res.send(response);
      responses = [];
  });
};