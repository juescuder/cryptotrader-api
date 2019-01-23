var request = require('request');
var _ = require('underscore');

exports.getPrice = function(symbol){
        return new Promise(function (resolve, reject) {

            var url = 'https://api.binance.com/api/v3/ticker/price';
            var options = { 
                json: true, 
                method: 'GET',
                header: {
                    'symbol' : symbol
                }
            }

            request(url, options, (err, res, body) => {
                
                var symbol = err == null ? res.request.header['symbol'] : "X";
                var code = getCodeBySymbol(symbol);
                var price = "N/A";

                if(err == null){
                    price = _.find(body, x => x.symbol.indexOf(code)>-1);
                    if(price != null)
                        price = parseFloat(price.price);
                    else
                        price = "N/A";
                }

                var coin = {
                    exchangeId : 1,
                    exchange : "Binance",
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
            return 'BTCUSDC';
        case 'ETH':
            return 'ETHUSDC';
        case 'XRP':
            return 'XRPUSDC';
        case 'BCH':
            return 'BCHUSDC';
        case 'EOS':
            return 'EOSUSDC';
        case 'XLM':
            return 'XLMUSDC';
        case 'LINK':
            return 'LINKUSDC';
        default:
            return 'N/A';
    }
}



  
