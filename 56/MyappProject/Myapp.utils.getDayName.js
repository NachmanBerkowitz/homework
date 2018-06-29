var Myapp = Myapp || {};

Myapp.utils = (function(utils){
    const dow = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Shabbos'];
    utils.getNameOfDay = (int) => {
        return dow[int - 1];
    };
    utils.getNumOfDay =(dayName) => {
        return (dow.indexOf(dayName) + 1);
    };
    return utils;
}(Myapp.utils || {}));
