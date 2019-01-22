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
            
            if(res != null)
            {
                if (err) 
                    return console.log(err); 

                var symbol = res.request.header['symbol'];
                
                var code = getCodeBySymbol(symbol);

                var price = body[code] != null ? parseFloat(body[code].last) : "N/A";

                var coin = {
                    exchangeId : 4,
                    exchange : "Poloniex",
                    price : price
                }

                resolve(coin);
            }
            else
            {
                resolve(null);
            }
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