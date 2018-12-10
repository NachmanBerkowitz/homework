const http = require('http');
const url = process.argv[2];
http.get(url, res => {
    res.setEncoding('utf8');
    const resDataArray = [];
    res.on('data', data => resDataArray.push(data));
    res.on('end', () => {
        const resString = resDataArray.join('');
        console.log(resString.length);
        console.log(resString);
    });
});
