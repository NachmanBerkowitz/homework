var fs = require('fs');
const fileAsString = fs.readFileSync(process.argv[2]).toString();
const myRegex = /\n/g;
let num = 0;
while(myRegex.exec(fileAsString)){num++;}
console.log(num);
