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

exports.writeInflux = function(owJSON) {

    return new Promise(function(resolve, reject) {
        let points = [
            [{
                'temperature': owJSON.current_temperature,
            }, {
                location: zip,
            }],
            [{
                'humidity': owJSON.current_humidity,
            }, {
                location: zip,
            }],
            [{
                'pressure_mb': owJSON.pressure_mb,
            }, {
                location: zip,
            }],
            [{
                'windSpeed': owJSON.windSpeed,
            }, {
                location: zip,
            }],
            [{
                'windDeg': owJSON.windDeg,
            }, {
                location: zip,
            }],
        ];


        client.writePoints('weather.openweather', points, function(err, response) {
            if (err) {
                return reject(new Error(err));
            } else {
                console.log("points written:", points)
                resolve();
            }
        });
    });
};
