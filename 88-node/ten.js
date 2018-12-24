const net = require('net');
const port = +process.argv[2];
function addZero(numString){
    return +numString>=10?numString:`0${numString}`;
}
var server = net.createServer(function(socket) {
    const date = new Date();
    socket.end(
        date.getFullYear() +
            '-' +
            addZero(+date.getMonth() + 1) +
            '-' +
            addZero(date.getDate()) +
            ' ' +
            addZero(date.getHours()) +
            ':' +
            addZero(date.getMinutes()) +
            '\n',
    );
});
server.listen(port);
