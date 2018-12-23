var fs = require('fs');
module.exports = function (dirPath, fileExt, toDoFunc){
    const ans = [];
    fs.readdir(dirPath, (err, list) => {
        if(err){toDoFunc(err); return;}
        list.forEach(li=>li.includes('.'+fileExt) && ans.push(li));
        toDoFunc(null,ans);
    });
};