const fs = require('fs');
fs.readdir('./2kk_words_400x400', (err, content) => {
    if(err) {
        console.error(err.message);
    }
    if(content) {
        if(content.length) {
            content.forEach(e => {
                fs.readFile('./2kk_words_400x400/' + e, (err, data) => {
                    if(err) {
                        console.error(err.message);
                    }
                    if(data) {
                        console.log(data.toString());
                        return;
                    }
                });
            });
        }
    }
})