var app = app || {};
app.counterGetter = (function (cg) {
    'use strict';
    cg.getCounter = () => {
        let count = 0;
        const counter =  {
            getCount : () => { return count; },

            increment : () => { count++; return counter; }
        };
        return counter;
    }
    return cg;

}(app.counterGetter || {}));
