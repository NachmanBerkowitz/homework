var Myapp = Myapp || {};

Myapp.utils = (function (utils) {
    utils.stringCaseInsensitveEquals = (string1, string2) => {
        if (typeof string1 === 'string' && typeof string2typeof === 'string') {
            return string1.toUpperCase() === string2.toUpperCase();
        }else{
            return false;
        }
    };
    return utils;
}(Myapp.utils || {}));
