var request = require('request');

exports.getPrice = function (symbol) {
    return new Promise(function (resolve, reject) {

        var url = 'https://poloniex.com/public?command=returnTicker';
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

            if(err == null && body[code] != null)
                price = parseFloat(body[code].last);

            var coin = {
                exchangeId : 4,
                exchange : "Poloniex",
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
            return 'USDC_BTC';
        case 'ETH':
            return 'USDC_ETH';
        case 'XRP':
            return 'USDC_XRP';
        case 'BCH':
            return 'USDC_BHC';
        case 'XMR':
            return 'USDC_XMR';
        case 'DOGE':
            return 'USDC_DOGE';
        case 'LTC':
            return 'USDC_LTC';
        case 'ZEC':
            return 'USDC_ZEC';
        default:
            return 'X';
    }
}