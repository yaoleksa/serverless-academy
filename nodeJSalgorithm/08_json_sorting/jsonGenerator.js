const fs = require('fs');
const https = require('https');
let randomArray = [];
for(let i = 0; i < 4; i++) {
    randomArray.push(parseInt(Math.random() * 255));
}
https.get(`https://ipinfo.io/${randomArray[0]}.${randomArray[1]}.${randomArray[2]}.${randomArray[3]}/geo`, res => {
    let data = [];
    res.on('data', chunk => {
        data.push(chunk);
    });
    res.on('end', () => {
        fs.writeFile('./data/json19.json', JSON.stringify(JSON.parse(Buffer.concat(data).toString()), null, 1), err => {
            if(err) {
                console.error(err.message);
            }
        });
    });
});