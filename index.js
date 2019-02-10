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

const address = argv.a;
console.log(address);
const geocode_url = `https://api.opencagedata.com/geocode/v1/json?key=c65f6b5c8624420f8f2a3ee85b7f7c47&q=${address}`;

axios.get(geocode_url)
.then(res => {
    console.log(res);
})
.catch(err => {
    console.log(err)
});
