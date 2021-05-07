const request = require('request');
const forcast = (lat,long, callback) => {
    var url = `http://api.weatherstack.com/current?access_key=61b0e2a490e4aac1a4f724daa5225458&query=${lat},${long}`;

    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined);
        }
        else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`)
        }
    });
}

module.exports = forcast;