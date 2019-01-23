var request = require('request');

exports.getPrice = function (symbol) {
    return new Promise(function (resolve, reject) {

        var url = 'https://bittrex.com/api/v1.1/public/getticker?market=' + getCodeBySymbol(symbol);
        var options = { 
            json: true, 
            method: 'GET',
            header: {
                'symbol' : symbol
            }
        }

        request(url, options, (err, res, body, symbol) => {
            
            var price = "N/A";

            if(err == null && body.result != null)
                price = parseFloat(body.result.Bid);

            var coin = {
                exchangeId : 2,
                exchange : "Bittrex",
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
            return 'USD-BTC';
        case 'ETH':
            return 'USD-ETH';
        case 'XRP':
            return 'USD-XRP';
        case 'TRX':
            return 'USD-TRX';
        case 'LTC':
            return 'USD-LTC';
        case 'BCH':
            return 'USD-BCH';
        case 'ETC':
            return 'USD-ETC';
        case 'ADA':
            return 'USD-ADA';
        case 'BSV':
            return 'USD-BSV';
        case 'ZEC':
            return 'USD-ZEC';
        case 'DGB':
            return 'USD-DGB';
        case 'ZRX':
            return 'USD-ZRX';
        case 'BAT':
            return 'USD-BAT';
        case 'SC':
            return 'USD-SC';
        case 'PAX':
            return 'USD-PAX';
        default:
            return 'X';
    }
}

