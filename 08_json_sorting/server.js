const http = require('http');
const fs = require('fs');
const url = require('url');
const port = process.env.PORT || 3001;

http.createServer((req, res) => {
    const pathName = url.parse(req.url).pathname;
    const number = /\d+/g.test(pathName) ? pathName.match(/\d+/g)[0] : null;
    if(number) {
        fs.readFile(`./data/${pathName}.json`, (err, data) => {
            if(err) {
                console.log(err.message);
            } else if(data) {
                res.write(data, err => {
                    if(err) {
                        console.error(err.message);
                    }
                    res.end();
                });
            }
        });
    } else {
        res.write('empty', err => {
            if(err) {
                console.error(err.message);
            }
            res.end();
        });
    }
}).listen(port, () => {
    console.log(`http://localhost:${port}`);
})