const pcs = (function () {
    'use strict';

    const helper = {
        get: function (id) {
            return document.getElementById(id);
        },

        setCss: function (elem, property, value) {
            elem.style[property] = value;
        },

        getCss: function (elem, property) {
            return elem.style[property];
        },

        rgbString: function () {
            return (Math.floor(Math.random() * 226)).toString();
        },

        cycleColors: function (HTMLelement, background) {
            let randomColor = `rgb(${helper.rgbString()}, ${helper.rgbString()}, ${helper.rgbString()})`;
            const ground = background ? 'backgroundColor' : 'color';
            HTMLelement.style[ground] = randomColor;
        },
    };

    return function (id) {
        const elem = helper.get(id);

        return {
            css: function (property, value) {
                if (arguments.length < 2) {
                    return helper.getCss(elem, property);
                }
                helper.setCss(elem, property, value);
                return this;
            },
            hide: function () {
                helper.setCss(elem, 'display', 'none');
            },
            show: function () {
                helper.setCss(elem, 'display', 'block');
            },
            click: function (callback) {
                elem.addEventListener('click', callback);
                return this;
            },
            changeColor: function (speedOfChangeInSeconds, ifBackground) {
                const interval = speedOfChangeInSeconds * 1000;
                setInterval(() => {
                    helper.cycleColors(elem, ifBackground);
                }, interval);
            }
        };
    };
}());

