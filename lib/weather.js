require('dotenv').config();
let weather = require('openweather-apis');

weather.setLang('en');
weather.setZipCode( process.env.ZIP_CODE);
weather.setAPPID(process.env.OPENWEATHER_KEY);
let data = {};

exports.getData = function() {
    return new Promise(function(resolve, reject) {
        weather.getAllWeather(function(err, JSONObj) {
            if(err) {
                return reject(new Error(err));
            }

            if((typeof JSONObj.main.temp) === 'number') {

                data['current_temperature'] = Math.round((JSONObj.main.temp * 9/5) + 32);
                data['current_humidity'] = JSONObj.main.humidity;
                data['pressure_mb'] = JSONObj.main.pressure;
                data['windSpeed'] = JSONObj.wind.speed;
                data['windDeg'] = JSONObj.wind.deg;
                
                // We Have Vaid JSON  Data
                resolve(data);
            } else {
                return reject(new Error('Undefined Json Data Returned'));
            }
        });
    });
};
