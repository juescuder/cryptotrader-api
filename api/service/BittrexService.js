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
            
            if (err) 
                return console.log(err); 

            var symbol = res.request.header['symbol'];
    
            var price = body.result != null ? parseFloat(body.result.Bid) : "N/A";

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
        case 'BCH':
            return 'USD-BCH';
    }
}

