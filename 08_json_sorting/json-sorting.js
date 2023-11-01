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
            let result;
            if(res.statusCode == 200) {
                res.on('data', chunk => {
                    data.push(chunk);
                });
                res.on('end', () => {
                    if(JSON.parse(Buffer.concat(data).toString()).isDone) {
                        success++;
                        console.log(`[Success] ${url}: isDone - True`);
                    } else {
                        console.log(`[Success] ${url}: isDone - False`);
                    }
                    if(url.includes('20')) {
                        console.log(`Found True values: ${success}\nFound False values: ${20 - success}`);
                    }
                });
            } else {
                console.log(`[Fail] ${url}: The endpoint is unavailable`);
            }
        });
    } catch(exception) {
        tryNumber++;
        makeCall(url, tryNumber);
    }
}