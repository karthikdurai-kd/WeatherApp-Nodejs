const request = require('request');
const forecast = (lat, long, callback)=>{
    const forecastUrl = 'http://api.weatherstack.com/current?access_key=279c599af58a069d2d0ded9331dbf119&query='+lat+','+long;
    request({url: forecastUrl, json: true}, (error, response)=>{
        //console.log(forecastUrl);
        if(error){
            console.log(error);
            callback("Cannot connect to weather service!", undefined);
        }
        else if(response.body.error){
            callback("Unable to find Location", undefined);
        }
        else{
           const print = response.body.current.weather_descriptions[0]+". It is "+ response.body.current.temperature+ " degrees out. But it feels like "+ response.body.current.feelslike+ " degrees out. Chance of rain is "+ response.body.current.precip;
           callback(undefined, print);
        }
    })
    
}
module.exports = forecast;