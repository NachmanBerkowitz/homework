var app = app || {};
app.counterGetter = (function (cg) {
    'use strict';
    let counterTracker = 0;
    cg.getAmountOfCounters = () => {return counterTracker;};
    cg.getCounter = () => {

        counterTracker++;

        let count = 0;
        const counter =  {
            getCount : () => { return count; },

            increment : () => { count++; return counter; }
        };
        return counter;
    }
    return cg;

}(app.counterGetter || {}));
