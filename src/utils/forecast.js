const request = require('request')

const forecast = (longitud, latitud, callback)=>{
    const url = 'https://api.darksky.net/forecast/e9ac81114069f9d1781cf38308d8ec06/'+ latitud +','+longitud+'?units=si'
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error){
            callback('Unable to find location. Try another search.', undefined)
        } else{
            callback(undefined,
                body.daily.data[0].summary + ' It is currently ' + body.currently.temperature +' degrees out. There is a ' + body.currently.precipProbability+ '% chance of rain.'
            )
        }
    })
}


module.exports = forecast