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
                
                if (err)
                    return console.log(err); 

                var symbol = res.request.header['symbol'];
                var code = getCodeBySymbol(symbol);
                var price = _.find(body, x => x.symbol.indexOf(code)>-1);

                var coin = {
                    exchangeId : 1,
                    exchange : "Binance",
                    price : price != null ? parseFloat(price.price) : "N/A"
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
        case 'XML':
            return 'XLMUSDC';
        case 'LINK':
            return 'LINKUSDC';
        default:
            return 'N/A';
    }
}



  
