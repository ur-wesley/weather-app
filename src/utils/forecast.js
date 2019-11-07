const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/ffc2cd4bbffb9733fd97dd27684ee9e4/' + latitude + ',' + longitude + '?lang=de&units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to DarkSkyApi!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' Es sind ' + body.currently.temperature + '°C im moment. Die Regenwahrscheinlichkeit beträgt ' + body.currently.precipProbability + '%.')
        }
    })
}

module.exports = forecast