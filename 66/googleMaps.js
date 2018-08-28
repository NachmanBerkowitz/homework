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
        return $.getJSON(`http://api.geonames.org/wikipediaSearch?q=${locale}&maxRows=10&username=slubowsky&type=json`);
    }

    function showLocale({ geonames: localeArray }) {
        if (localeArray.length > 0) {
            localeTitle.empty();
            localeArray.forEach( ({ lat, lng, summary, thumbnailImg, title, wikipediaUrl }) => {
                const div = $(`<div class="locale">${title}</div>`)
                    .appendTo(localeTitle)
                    .css('background-color', helper.randomColor())
                    .data({ lat, lng, summary, thumbnailImg, wikipediaUrl })
                    .on('click', () => {
                        showinfo(div.data());
                    });
            });
        }
    }

    function showinfo({ lat, lng, summary, thumbnailImg, wikipediaUrl }) {
        
        new google.maps.Map(document.getElementById('map'), {
            center: { lat, lng },
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.MAP
        });

        info.empty;
      
        summarySpot.text(`${summary.substr(0, summary.length-5)}... (For more see Wikapedia)`);
        img.attr('src', thumbnailImg);
        $('#info a').attr('href', `https://${wikipediaUrl}`);
    }
    

}());


