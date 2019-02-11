const yargs = require('yargs');
const axios = require('axios');

let argv = yargs
        .options({
            address: {
                describe: 'Address to be searched for weather updates',
                demand: true,
                alias: 'a',
                string: true
            }
        })
        .help()
        .alias('help', 'h')
        .argv;

const address = encodeURIComponent(argv.a);

const geocode_url = `https://api.opencagedata.com/geocode/v1/json?key=c65f6b5c8624420f8f2a3ee85b7f7c47&q=${address}`;

//Geocode Request
axios.get(geocode_url)
.then(res => {

    // Error Checking
    if(res.data.status.code != 200){
        throw new Error("Unable to connect to the Servers. ");
    }else if(!res.data.total_results > 0) {
        throw new Error("No Results Found");
    }

    // Coords of most appropriate location 
    const coords = {
        lat : res.data.results[0].geometry.lat,
        lng : res.data.results[0].geometry.lng
    }
    
    const weather_url = `https://api.darksky.net/forecast/6715958b18e4a35bc5d6846f9f8fa98d/${coords.lat},${coords.lng}`;

    console.log(`Address : ${res.data.results[0].formatted}`);

    return axios.get(weather_url);
})
.then(res => {

    // Error Checking
    if(res.status !== 200 || res.code === 'ENOTFOUND'){
        throw new Error("\nUnable to connect to the Weather API servers. ");
    }
    
    const data = {
            temp: res.data.currently.temperature,
            appTemp: res.data.currently.apparentTemperature,
            summary: res.data.currently.summary,
            humidity: res.data.currently.humidity
        };

    console.log(`\nToday's Forecast\n`);
    console.log(`Summary: ${data.summary}`);
    console.log(`Temperature: ${data.temp} F`);
    console.log(`Apparent Temperature: ${data.appTemp} F`);
    console.log(`Humidity: ${data.humidity}\n`);
})
.catch(err => {
    console.log(err.message);
})








