require('dotenv').config();
let influx = require('influx');

let client = influx({
    host: process.env.INFLUX_HOST,
    port: process.env.INFLUX_PORT,
    protocol: 'http',
    username: process.env.INFLUX_USERNAME,
    password: process.env.INFLUX_PASSWORD,
    database: process.env.INFLUX_DB,
});

const zip = process.env.ZIP_CODE;

exports.writeInfluxAqi = function(wbJSON) {
    return new Promise(function(resolve, reject) {
        let points = [
            [{
                'aqi': wbJSON.data[0].aqi || -1,
            }, {
                location: zip,
            }],
            [{
                'pollen_tree': wbJSON.data[0].pollen_level_tree || -1,
            }, {
                location: zip,
            }],
            [{
                'pollen_grass': wbJSON.data[0].pollen_level_grass || -1,
            }, {
                location: zip,
            }],
            [{
                'pollen_weed': wbJSON.data[0].pollen_level_weed || -1,
            }, {
                location: zip,
            }],
        ];

        client.writePoints('weather.weatherBit', points, function(err, response) {
            if (err) {
                return reject(new Error(err));
            } else {
                console.log("points written:", points)
                resolve();
            }
        });
    });
};
