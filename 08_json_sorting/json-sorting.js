const http = require('http');
const port = process.env.PORT || 3001;
const endpoints = [];
for(let i = 1; i < 21; i++) {
    endpoints.push(`http://localhost:${port}/json${i}`);
}
let success = 0;
endpoints.forEach(endpoint => {
    makeCall(endpoint, 0);
});

async function makeCall(url, tryNumber) {
    if(tryNumber >= 3) {
        return;
    }
    try {
        http.get(url, res => {
            const data = [];
            if(res.statusCode == 200) {
                res.on('data', chunk => {
                    data.push(chunk);
                });
                res.on('end', () => {
                    if(JSON.parse(Buffer.concat(data).toString()).isDone) {
                        success++;
                    }
                    if(url.includes('20')) {
                        console.log(`Found True values: ${success}\nFound False values: ${20 - success}`);
                    }
                });
            }
        });
    } catch(exception) {
        tryNumber++;
        makeCall(url, tryNumber);
    }
}