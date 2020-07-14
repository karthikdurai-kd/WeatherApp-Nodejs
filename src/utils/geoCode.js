const request = require('request');
//Fetching Latitude and Longitude data from Mapbox API

const geoCode = (address, callback)=>{
    const latLongUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1Ijoia2FydGhpay1kdXJhaS0xOTk4IiwiYSI6ImNrYmo2b2poNjA1dngycmxjZDR6c21rOHYifQ.HPvFI2UnsnBLVTKNUazeVA&limit=1";
    request({url: latLongUrl, json: true},(error, response)=>{
        if(error){ //Low-Level Error, and this is from local machine like No Internet Connection
           callback('Cannot connect to Mapbox Latitude ang Longitude Service', undefined);
        }
        else if(response.body.features.length === 0 || response.body.message){ //This is medium-level error and this occurs when sending invalid API request like missing some paramters
           callback('Please specify a valid location to find Latitude and Longitude',undefined);
        }
        else{ //Actual data comes without error
           callback(undefined, {
               latitude: response.body.features[0].center[1],
               longitude: response.body.features[0].center[0],
               location: response.body.features[0].place_name
           })
        }
    })
 }
 module.exports = geoCode;