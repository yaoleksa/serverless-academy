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
            console.log(`Exist in all files: ${existInAllFiles(map)}`);
            console.log(`Exist at least in 10 files: ${existInAtleastTen(map)}`);
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
            unique.add(array);
        }
    });
    return unique.size;
}

function existInAllFiles(mapArr) {
    const iterator = mapArr.keys();
    let key = iterator.next().value;
    const first = mapArr.get(key);
    const result = new Set();
    const newMap = new Map();
    while(key) {
        newMap.set(key, new Set(mapArr.get(key)));
        key = iterator.next().value;
    }
    first.forEach(e => {
        const keys = newMap.keys();
        let key1 = keys.next().value;
        let count = 1;
        while(key1) {
            key1 = keys.next().value;
            if(key1 && newMap.get(key1).has(e)) {
                count++;
            }
        }
        if(count >= newMap.size - 1) {
            result.add(e);
        }
    });
    return result.size;
}

function existInAtleastTen(mapArr) {
    const unique = new Set();
    mapArr.forEach(array => {
        if(array.length) {
            array.forEach(e => {
                unique.add(e);
            })
        } else {
            unique.add(array);
        }
    });
    const keys = [];
    const iterator = mapArr.keys();
    let key = iterator.next().value;
    const newMap = new Map();
    while(key) {
        keys.push(key);
        newMap.set(key, new Set(mapArr.get(key)));
        key = iterator.next().value;
    }
    // Final solution: start
    const result = new Set();
    for(let unit of unique) {
        let count = 0;
        keys.forEach(key => {
            if(newMap.get(key).has(unit)) {
                count++;
            }
        });
        if(count >= 10) {
            result.add(unit);
        }
    }
    // Final solution: end
    return result.size;
}