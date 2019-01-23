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
                
                var symbol = err == null ? res.request.header['symbol'] : "X";
                var code = getCodeBySymbol(symbol);
                var price = "N/A";

                if(err == null && (body.result != null && body.result[code] != null))
                    parseFloat(body.result[code].a[0]);

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
        case 'DASH':
            return 'DASHUSD';
        case 'ETH':
            return 'ETHUSD';
        case 'ZEC':
            return 'XZECZUSD';
        case 'ETC':
            return 'ZETCZUSD';
        case 'LTC':
            return 'XLTCZUSD';
        case 'XMR':
            return 'XXMRZUSD';
        default:
            return 'X';
    }
}



  
