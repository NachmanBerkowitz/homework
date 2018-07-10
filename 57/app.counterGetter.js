var app = app || {};
app.counterGetter = (function (cg) {
    'use strict';
    let counterTracker = 0;
    cg.getAmountOfCounters = () => counterTracker;
    cg.getCounter = () => {

        counterTracker++;

        let count = 0;
        const counter =  {
            getCount : () => count,

            increment : () => { count++; return counter; }
        };
        return counter;
    };
    return cg;

}(app.counterGetter || {}));
