const https = require('https');
const endpoints = `https://jsonbase.com/sls-team/json-793
https://jsonbase.com/sls-team/json-955
https://jsonbase.com/sls-team/json-231
https://jsonbase.com/sls-team/json-931
https://jsonbase.com/sls-team/json-93
https://jsonbase.com/sls-team/json-342
https://jsonbase.com/sls-team/json-770
https://jsonbase.com/sls-team/json-491
https://jsonbase.com/sls-team/json-281
https://jsonbase.com/sls-team/json-718
https://jsonbase.com/sls-team/json-310
https://jsonbase.com/sls-team/json-806
https://jsonbase.com/sls-team/json-469
https://jsonbase.com/sls-team/json-258
https://jsonbase.com/sls-team/json-516
https://jsonbase.com/sls-team/json-79
https://jsonbase.com/sls-team/json-706
https://jsonbase.com/sls-team/json-521
https://jsonbase.com/sls-team/json-350
https://jsonbase.com/sls-team/json-64`.split('\n');

let options;

// endpoints.forEach(endpoint => {
//     options = {
//         host: endpoint.slice(endpoint.indexOf('/') + 2, endpoint.indexOf('.com/') + 4),
//         port: 3000,
//         path: endpoint.slice(endpoint.indexOf('.com/') + 4)
//     }
//     try {
//         https.get(options, res => {
//             console.log(res);
//         });
//     } catch(err) {
//         console.log(err.message);
//     }
// });

options = {
    host: 'api.publicapis.org',
    port: 3000,
    path: '/entries'
}

// just check if it works at all

https.get('https://api.publicapis.org/entries', res => {
    const data = [];
    res.on('data', chunk => {
        data.push(chunk);
    });
    res.on('end', () => {
        console.log(JSON.stringify(JSON.parse(Buffer.concat(data).toString()).entries, null, 2));
    });
});