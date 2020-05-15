require('dotenv').config();
const Influx = require('./lib/influx');
const InfluxAqi = require('./lib/InfluxAqi');
const Weather = require('./lib/weather');
const Aqi = require('./lib/aqi');

console.log("Starting openweather-influxdb...")

let updateFrequency = process.env.UPDATE_FREQUENCY;
let updateFrequencyAqi = process.env.UPDATE_FREQUENCY_AQI;

function getData() {
    Weather.getData().then(Influx.writeInflux).then(function() {
        setTimeout(getData, updateFrequency);
    }).catch(function(e) {

        console.log('Error: ' + e.message);
        // Retry on error, but timeout for 5 minutes
        setTimeout(getData, 300000);
    });
};

function getAqiData() {
    Aqi.getAqiData().then(InfluxAqi.writeInfluxAqi).then(function() {
        setTimeout(getAqiData, updateFrequencyAqi);
    }).catch(function(e) {

        console.log('Error: ' + e.message);
        // Retry on error, but timeout for 5 minutes
        setTimeout(getAqiData, 300000);
    });
};

// Start after 10 seconds
setTimeout(function() {
    // getData();
    getAqiData();
}, 10000);
