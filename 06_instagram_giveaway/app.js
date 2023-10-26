const start = Date.now();
const fs = require('fs');
fs.readdir('./2kk_words_400x400', (err, content) => {
    if(err) {
        console.error(err.message);
    }
    if(content) {
        if(content.length) {
            const map = new Map();
            const files = [];
            content.forEach(e => {
                map.set(e, fs.readFileSync('./2kk_words_400x400/' + e).toString().split('\n'));
                files.push(e);
            });
            console.log(`Unique names: ${uniqueValues(map)}`);
            console.log(`Exist in all files: ${existInAllFiles()}`);
            console.log(`Elapsed time: ${Date.now() - start} ms`);
        }
    }
});

function uniqueValues(mapArr) {
    const unique = new Set();
    mapArr.forEach(array => {
        if(array.length) {
            array.forEach(e => {
                unique.add(e);
            });
        } else {
            unique.add(e);
        }
    });
    return unique.size;
}

function existInAllFiles() {
    // TODO
    return 0;
}