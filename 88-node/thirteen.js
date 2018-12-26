const http = require('http');
const port = process.argv[2];
const url = require('url');

http.createServer(function(req,res){
    const theUrl = url.parse(req.url,true);
    const ISOtime  = new Date(theUrl.query.iso);
    const pathEndPoint = theUrl.pathname.split('/').pop();
    if(pathEndPoint === 'parsetime'){
        const time = {
            hour : ISOtime.getHours(),
            minute : ISOtime.getMinutes(),
            second : ISOtime.getSeconds()
        }
        res.end(JSON.stringify(time))
    }else{
        res.end(JSON.stringify({unixtime:ISOtime.getTime()}))
    }
}).listen(port);