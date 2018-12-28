const fs = require('fs');

module.exports = (url) => {
    url = `public/${url}`;

    const readStream = fs.createReadStream(url);
    readStream.on('error',err=>console.log(err));
    return readStream;
};