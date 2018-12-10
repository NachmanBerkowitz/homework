var fs = require('fs');
fs.readFile(process.argv[2], (err, data) => {
    if (err) {
        return console.log(err);
    }
    const fileAsString = data.toString();
    const myRegex = /\n/g;
    let num = 0;
    while (myRegex.exec(fileAsString)) {
        num++;
    }
    console.log(num);
});
