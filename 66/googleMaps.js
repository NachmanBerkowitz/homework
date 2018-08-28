/* global google, $ */
(function () {
    'use strict';

    const helper = {
        randomRgb: function () {
            return (Math.floor(Math.random() * 226));
        },

        randomColor: function (HTMLelement, background) {
            let randomColor = `rgb(${helper.randomRgb()}, ${helper.randomRgb()}, ${helper.randomRgb()})`;
            if (!HTMLelement) {
                return randomColor;
            }
            const ground = background ? 'backgroundColor' : 'color';
            $('HTMLelement').css(`${ground}`, randomColor);
        }
    };

    const input = $('#placeInput');
    const placeButton = $('#placeButton');
    const localeTitle = $('#localeTitle');
    const info = $('#info');

    const summary = $('#summary');
    const img = $('#info img');

    let previousSelection = 'Jerusalem';

    (function setup() {
        getLocales('Jerusalem')
            .done((data) => {
                showLocale(data);
                const a = $('.locale')[0];
                showinfo(a.attributes);
            });
    }());

    placeButton.on('click', () => {
        const curentInput = input.val();
        if (curentInput !== previousSelection) {
            getLocales(curentInput)
                .done(showLocale);
        }
        previousSelection = curentInput;
    });

    input.on('keyup', (event) => {
        if (event.keyCode === 13) {
            placeButton.click();
        }
    });

    function getLocales(locale) {
        return $.getJSON(`http://api.geonames.org/wikipediaSearch?q=${locale}&maxRows=10&username=slubowsky&type=json`);
    }

    function showLocale({ geonames: localeArray }) {
        if (localeArray.length > 0) {
            localeTitle.empty();
            localeArray.forEach(({ lat, lng, summary, thumbnailImg, title, wikipediaUrl }) => {
                const div = $(`<div class="locale">${title}</div>`)
                    .appendTo(localeTitle)
                    .css('background-color', helper.randomColor())
                    .on('click', (event) => {
                        showinfo(event.currentTarget.attributes);
                    });
                div.attr({ lat, lng, summary, thumbnailImg, wikipediaUrl });
            });
        }
    }

    function showinfo(localeInfo) {
        const lat = parseFloat(localeInfo.lat.nodeValue);
        const lng = parseFloat(localeInfo.lng.nodeValue);
        const location = { lat, lng };

        new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.MAP
        });

        info.empty;
        summary.text(localeInfo.summary.nodeValue.substr(0, localeInfo.summary.nodeValue.length-5));
        img.attr('src', localeInfo.thumbnailImg.nodeValue);
        console.log(img);
        $('#info a').attr('href', `https://${localeInfo.wikipediaUrl.nodeValue}`);
    }
    

}());


