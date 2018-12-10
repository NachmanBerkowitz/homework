var fs = require('fs');
const path = process.argv[2], ext = process.argv[3];
fs.readdir(path, (err, list) => {
    if (err) return console.error(err);
    list.forEach(li=>li.includes('.'+ext) && console.log(li));
});
