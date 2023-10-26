const fs = require('fs');
fs.readdir('./2kk_words_400x400', (err, content) => {
    if(err) {
        console.error(err.message);
    }
    if(content) {
        if(content.length) {
            let all = [];
            content.forEach(e => {
                all.push(...fs.readFileSync('./2kk_words_400x400/' + e).toString().split('\n'));
            });
            console.log(uniqueValues(all));
        }
    }
});

function uniqueValues(arr) {
    const unique = new Set();
    arr.forEach(e => {
        unique.add(e);
    });
    return unique.size;
}