const http = require('http');
const fs = require('fs');
const url = require('url');
const port = process.env.PORT || 3001;

const randErr = [];
for(let i = 0; i < 3; i++) {
    randErr.push(parseInt(Math.random() * 20).toString());
}

http.createServer((req, res) => {
    const pathName = url.parse(req.url).pathname;
    const number = /\d+/g.test(pathName) ? pathName.match(/\d+/g)[0] : null;
    if(number && !randErr.includes(number)) {
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
        res.writeHead(404, "Unavaliable");
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