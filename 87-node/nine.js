const http = require('http');
const [, , url1, url2, url3] = process.argv;
let doneFetch = 0;
const resStrings = [[], [], []];
[url1, url2, url3].forEach((url, index) => {
    http.get(url, res => {
        res.setEncoding('utf8');
        res.on('error', err => {
            return console.error(err);
        });
        res.on('data', data => resStrings[index].push(data));
        res.on('end', () => {
            doneFetch++;
            if (doneFetch === 3) {
                resStrings.forEach(resArray => {
                    console.log(resArray.join(''));
                });
            }
        });
    });
});
