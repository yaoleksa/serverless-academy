const fs = require('fs');
fs.readFile('./data.json', (err, data) => {
    if(err) {
        console.error(err.message);
    }
    if(data) {
        const convertedData = data.toString('utf-8');
        const beforeParsing = convertedData.slice(1, convertedData.indexOf("].gitignore")).replace(/\},\r\n\s+\{/g, '}*\n{').split("*\n");
        const convertedToArray = [];
        beforeParsing.forEach(e => {
            convertedToArray.push(JSON.parse(e));
        });
        console.log(convertedToArray.length);
    }
})