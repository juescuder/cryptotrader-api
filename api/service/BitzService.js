var request = require('request');
var _ = require('underscore');

exports.getPrice = function(symbol){
        return new Promise(function (resolve, reject) {

            var url = 'https://apiv2.bitz.com/Market/ticker?symbol=' + getCodeBySymbol(symbol);
            var options = { 
                json: true, 
                method: 'GET',
                header: {
                    'symbol' : symbol
                }
            }

            request(url, options, (err, res, body) => {
                
                var price = "N/A";

                if(err == null && body.data != "")
                    price = parseFloat(body.data.bidPrice);

                var coin = {
                    exchangeId : 9,
                    exchange : "BitZ",
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
            return 'btc_usdt';
        case 'ETH':
            return 'eth_usdt';
        case 'XRP':
            return 'xrp_usdt';
        case 'BCH':
            return 'bch_usdt';
        case 'EOS':
            return 'eos_usdt';
        case 'LTC':
            return 'ltc_usdt';
        case 'NEO':
            return 'neo_usdt';
        case 'MIOTA':
            return 'miota_usdt';
        case 'ETC':
            return 'etc_usdt';
        case 'XMR':
            return 'xmr_usdt';
        case 'BSV':
            return 'bsv_usdt';
        case 'DASH':
            return 'dash_usdt';
        case 'ZEC':
            return 'zec_usdt';
        case 'BTG':
            return 'btg_usdt';
        case 'XLM':
            return 'xlm_usdt';
        case 'TRX':
            return 'trx_usdt';
        case 'XLM':
            return 'xlm_usdt';
        default:
            return 'N/A';
    }
}



  
