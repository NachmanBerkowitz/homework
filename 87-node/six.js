const myFunc = require('./six-module.js');
const path = process.argv[2], ext = process.argv[3];
// console.log(myFunc);
myFunc(path,ext,(err,data)=>{
    if(err) return console.log(err);
    data.forEach((i)=>{
        console.log(i);
    });
});