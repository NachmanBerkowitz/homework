/* global google, $ */
(function () {
    'use strict';

    const helper = {
        randomLightColor: function () {
            const minTotal = 383;
            const max_rgb = 255;

            const r = helper.randInt(0, max_rgb);
            let min = (r < (minTotal - max_rgb)) ? (minTotal - r) - max_rgb : 0;
            const g = helper.randInt(min, max_rgb);
            min = (r + g < minTotal) ? (minTotal - (g + r)) : 0;
            const b = helper.randInt(min, max_rgb);

            return `rgb(${r},${g},${b})`;
        },

        randomDarkColor: function () {
            const maxTotal = 383;
            const max_rgb = 255;

            const r = helper.randInt(0, max_rgb);
            let max = maxTotal - r < max_rgb ? maxTotal - r : max_rgb;
            const g = helper.randInt(0, max);
            max = maxTotal - (r + g) < max_rgb ? maxTotal - (r + g) : max_rgb;
            const b = helper.randInt(0, max);

            return `rgb(${r},${g},${b})`;
        },

        randInt: function (min, limit) {
            return (Math.floor((Math.random() * ((limit + 1) - min)) + min));
        }
    };

    const input = $('#placeInput');
    const placeButton = $('#placeButton');
    const localeTitle = $('#localeTitle');

    const summarySpot = $('#summary');
    const img = $('#info img');

    let previousSelection = 'Jerusalem';

    (function setup() {
        getLocales('Jerusalem')
            .done((data) => {
                showLocale(data);
                const a = $($('.locale')[0]);
                showinfo(a.data());
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
        return $.getJSON(`http://api.geonames.org/wikipediaSearch?q=${locale}&maxRows=10&username=nachman_berkowitz&type=json`);
    }

    function showLocale({ geonames: localeArray }) {
        if (localeArray.length > 0) {
            localeTitle.empty();
            localeArray.forEach(({ lat, lng, summary, thumbnailImg, title, wikipediaUrl }) => {
                const div = $(`<div class="locale">${title}</div>`)
                    .appendTo(localeTitle)
                    .css('background-color', helper.randomLightColor())
                    .data({ lat, lng, summary, thumbnailImg, wikipediaUrl })
                    .on('click', () => {
                        showinfo(div.data());
                    });
            });
        }
    }
    let map;
    function showinfo({ lat, lng, summary, thumbnailImg, wikipediaUrl }) {

        map = map ||
            new google.maps.Map(document.getElementById('map'), {
                center: { lat, lng },
                zoom: 18,
                mapTypeId: google.maps.MapTypeId.MAP
            });

        map.setCenter({ lat, lng });

        summarySpot.text(`${summary.substr(0, summary.length - 5)}... (For more see Wikipedia)`);
        img.attr('src', thumbnailImg);
        $('#info a').attr('href', `https://${wikipediaUrl}`);
    }


}());


