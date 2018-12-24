const http = require('http');
const port = process.argv[2];
const map = require('through2-map');

const server = http.createServer(function(req, res) {
    req.pipe(map(chunk=>chunk.toString().toUpperCase())).pipe(res);
});
server.listen(port);
