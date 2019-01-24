'use strict';

var rxjs = require('rxjs');
var _ = require('underscore');
var async = require('async');
var cache = require('memory-cache');

var s1 = require('../service/BinanceService');
var s2 = require('../service/BittrexService');
var s3 = require('../service/CryptopiaService');
var s4 = require('../service/PoloniexService');
var s5 = require('../service/CoinbaseService');
var s6 = require('../service/KrakenService');
var s7 = require('../service/BitfinexService');
var s8 = require('../service/OkexService');
var s9 = require('../service/BitzService');

var services = [s1, s2, s3, s4, s5, s6, s7, s8, s9];
var responses = [];

exports.coin = function(req, res) {

  var responses = [];
  var symbol = req.params.symbol;
  console.log('Symbol requested: ' + symbol);

  if(cache.get(symbol) != null)
  {
    console.log('Returned from Cache: ' + symbol);
    res.send(cache.get(symbol));
  }
  else
  {
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
            x.price = x.price.toFixed(4);
          }
        });
  
        var response = {
          symbol: symbol,
          average: parseFloat((amount / count).toFixed(4)),
          time : new Date().toUTCString(),
          exchanges : _.sortBy(responses, x => x.exchangeId),
          netGap: 0
        }
  
        let maxGap = 0;
        let minGap = 0;

        _.forEach(response.exchanges, x => {
          if(x.price != "N/A")
          {
            x.gap = parseFloat(((x.price - response.average) * 100 / response.average).toFixed(3));
            if(x.gap > maxGap)
              maxGap = x.gap;

            if(x.gap < minGap)
              minGap = x.gap;
          }
          else
            x.gap = "N/A";
        });

        //NetGap
        response.netGap = (maxGap - minGap).toFixed(3);

        cache.put(symbol, response, 60000);
        console.log('Added to Cache: ' + symbol);

        res.send(response);
        responses = [];
    });
  }

  
};