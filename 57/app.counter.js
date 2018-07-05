var app = app || {};

app.counter = (function (counter) { 
    'use strict';
    let count = 0;

    counter.getCount = ()=>{return count;};

    counter.increment = ()=>{count++; return counter;};

    return counter;
}(app.counter || {}));
