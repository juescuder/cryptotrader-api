//https://api.bitfinex.com/v1/pubticker/btcusd

var request = require('request');
var _ = require('underscore');

exports.getPrice = function(symbol){
        return new Promise(function (resolve, reject) {

            var url = 'https://api.bitfinex.com/v1/pubticker/' + getCodeBySymbol(symbol);
            var options = { 
                json: true, 
                method: 'GET',
                header: {
                    'symbol': symbol
                }
            }

            request(url, options, (err, res, body) => {
                
                var price = "N/A";

                if(err == null && body.message == null)
                    price = parseFloat(body.mid);

                var coin = {
                    exchangeId : 7,
                    exchange : "Bitfinex",
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
            return 'btcusd';
        case 'ETH':
            return 'ethusd';
        case 'XRP':
            return 'xrpusd';
        case 'LTC':
            return 'ltcusd';
        case 'EOS':
            return 'eosusd';
        case 'NEO':
            return 'neousd';
        case 'MIOTA':
            return 'miotausd';
        case 'ETC':
            return 'etcusd';
        case 'XMR':
            return 'xmrusd';
        case 'BSV':
            return 'bsvusd';
        case 'DASH':
            return 'dashusd';
        case 'ZEC':
            return 'zecusd';
        case 'BTG':
            return 'btgusd';
        case 'XLM':
            return 'xlmusd';
        case 'TRX':
            return 'trxusd';
        default:
            return 'X';
    }
}



  
