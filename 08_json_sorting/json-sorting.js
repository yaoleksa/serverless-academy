const http = require('http');
const port = process.env.PORT || 3001;
const endpoints = [];
for(let i = 1; i < 21; i++) {
    endpoints.push(`http://localhost:${port}/json${i}`);
}

http.get(endpoints[11], res => {
    const data = [];
    res.on('data', chunk => {
        data.push(chunk);
    });
    res.on('end', () => {
        console.log(JSON.stringify(JSON.parse(Buffer.concat(data).toString()), null, 2));
    })
});