const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/a914d42726582697179b5a47d6b280cf/' + lat + ',' + long + '?units=si&lang=ko'

    request({url, json: true}, (err, { body }) => {
        if (err) {
            callback("Unable to connect weather service!")
        } else if (body.err) {
            callback('Unaable to find location!')
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast