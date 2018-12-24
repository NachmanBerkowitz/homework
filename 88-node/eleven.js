const http = require('http');
const fs = require('fs');

const port = process.argv[2];
const stream = fs.createReadStream(process.argv[3]);
const server = http.createServer(function(req, res) {
    stream.pipe(res);
});
server.listen(port);
