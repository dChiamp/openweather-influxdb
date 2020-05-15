require('dotenv').config();
const fetch = require('node-fetch');

let aqiUrl = `https://api.weatherbit.io/v2.0/current/airquality?postal_code=${process.env.ZIP_CODE}&country=US&key=${process.env.WEATHERBIT_KEY}`

let data = {};

exports.getAqiData = function() {
    return new Promise(function(resolve, reject) {

    fetch(aqiUrl)
        .then(res => res.json())
        .then(json => {
            console.log('weatherBit res:', json.data) 
            // data['pollen_level_tree'] = json.data[0].pollen_level_tree;
            data = json
            resolve(data)
        })
        .catch(err => {
            console.error(err)
            return reject(new Error('Undefined Json Data Returned'));
        });
    });
};
