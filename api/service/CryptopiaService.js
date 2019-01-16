var request = require('request');
//https://www.cryptopia.co.nz/api/GetMarkets

exports.getPrice = function (symbol) {
    return new Promise(function (resolve, reject) {

        var coin = {
            exchangeId : 3,
            exchange : "Cryptopia",
            price : "N/A"
        }

        resolve(coin);
    });
}
