//{"data":{"base":"BTC","currency":"USD","amount":"3602.00"}}

var request = require('request');

exports.getPrice = function (symbol) {
    return new Promise(function (resolve, reject) {

        var url = 'https://api.coinbase.com/v2/prices/' + getCodeBySymbol(symbol) + '/spot';
        var options = { 
            json: true, 
            method: 'GET',
            header: {
                'symbol' : symbol
            }
        }

        request(url, options, (err, res, body) => {
            
            var symbol = res.request.header['symbol'];

            var price = (body.errors == null || body.errors.length == 0) ? parseFloat(body.data.amount) : "N/A"

            var coin = {
                exchangeId : 5,
                exchange : "Coinbase",
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
            return 'BTC-USD';
        case 'ETH':
            return 'ETH-USD';
        case 'ETC':
            return 'ETC-USD';
        case 'LTC':
            return 'LTC-USD';
        case 'BCH':
            return 'BCH-USD';
        case 'ZRX':
            return 'ZRX-USD';
        case 'BAT':
            return 'BAT-USDC';
        case 'ZEC':
            return 'BTC-USDC';
        default:
            return 'X';
    }
}
