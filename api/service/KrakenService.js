//https://api.kraken.com/0/public/Ticker?pair=BCHEUR,BCHUSD
//https://api.kraken.com/0/public/Ticker?pair=ETHUSD

var request = require('request');
var _ = require('underscore');

exports.getPrice = function(symbol){
        return new Promise(function (resolve, reject) {

            var url = 'https://api.kraken.com/0/public/Ticker?pair=' + getCodeBySymbol(symbol);
            var options = { 
                json: true, 
                method: 'GET',
                header: {
                    'symbol': symbol
                }
            }

            request(url, options, (err, res, body) => {
                
                if (err)
                    return console.log(err); 

                var symbol = res.request.header['symbol'];
                var code = getCodeBySymbol(symbol);
                var price = body.result[code] != null ? parseFloat(body.result[code].a[0]) : "N/A";

                var coin = {
                    exchangeId : 6,
                    exchange : "Kraken",
                    price : price
                }
        
                resolve(coin);
            });
        });
}

function getCodeBySymbol(symbol){

    switch(symbol)
    {
        case 'BTC':
            return 'XXBTZUSD';
        case 'ETH':
            return 'ETHUSD';
        case 'XRP':
            return 'XXRPZUSD';
        case 'BCH':
            return 'BCHUSD';
    }
}



  
