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

    const drawShapes = {
        marker: function (latLng, index) {
            const m = new google.maps.Marker({
                position: latLng,
                map: map,
                draggable: true
            });
            m.index = index;
        },
        circle: function ({ center, radius }, index) {
            const c = new google.maps.Circle({
                center: center,
                radius: radius,
                map: map,
                draggable: true
            });
            c.index = index;
        },
        polyline: function (points, index) {
            const p = new google.maps.Polyline({
                path: points,
                map: map,
                draggable: true
            });
            p.index = index;
        },
        polygon: function (points, index) {
            const p = new google.maps.Polygon({
                paths: points,
                map: map,
                draggable: true
            });
            p.index = index;
        },
        rectangle: function (bounds, index) {
            const r = new google.maps.Rectangle({
                bounds: bounds,
                map: map,
                draggable: true
            });
            r.index = index;
        }
    };

    function mapSetup() {

        map = mapSetup.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 31.783333, lng: 35.216667 },
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.MAP,

        });

        const drawingManager = new google.maps.drawing.DrawingManager({
            markerOptions: { draggable: true },
            circleOptions: { draggable: true },
            rectangleOptions: { draggable: true },
            polylineOptions: { draggable: true },
            polygonOptions: { draggable: true }
        });
        drawingManager.setMap(map);

        google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
            const overlay = event.overlay;
            const shape = event.type;
            let coordinates;
            if (shape === 'marker') {
                coordinates = { lat: overlay.position.lat(), lng: overlay.position.lng() };
            } else if (shape === 'circle') {
                coordinates = { center: { lat: overlay.center.lat(), lng: overlay.center.lng() }, radius: overlay.radius };
            } else if (shape === 'rectangle') {
                coordinates = overlay.bounds;
            } else if (shape === 'polyline' || shape === 'polygon') {
                coordinates = overlay.latLngs.b[0].b;
            }
            addToLocalStorage(shape, coordinates, overlay);
        });

        function addToLocalStorage(shape, info ,overlay) {
            let shapeLocalStorage = localStorage[shape];
            const shapeArray = shapeLocalStorage ? JSON.parse(shapeLocalStorage) : [];
            overlay.index = shapeArray.length;
            shapeArray.push(info);
            localStorage[shape] = JSON.stringify(shapeArray);
        }
        
        
    }



    let map;
    const input = $('#placeInput');
    const placeButton = $('#placeButton');
    const localeTitle = $('#localeTitle');

    const summarySpot = $('#summary');
    const img = $('#info img');

    let previousSelection = '';

    placeButton.on('click', () => {
        const curentInput = input.val();
        if (curentInput !== previousSelection) {
            getLocales(curentInput)
                .done(showLocale);
        }
        previousSelection = curentInput;
    });

    (function setup() {
        mapSetup();
        placeButton.trigger('click');

        for (const shape in localStorage) {
            if (localStorage.hasOwnProperty(shape)) {
                const shapeArray = JSON.parse(localStorage[shape]);
                shapeArray.forEach((shapeInfo, index) => {
                    drawShapes[shape](shapeInfo, index);
                });
            }
        }
    }());



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
            $($('.locale')[0]).click();
        }
    }

    function showinfo({ lat, lng, summary, thumbnailImg, wikipediaUrl }) {

        map.setCenter({ lat, lng });

        summarySpot.text(`${summary.substr(0, summary.length - 5)}... (For more see Wikipedia)`);
        img.attr('src', thumbnailImg);
        $('#info a').attr('href', `https://${wikipediaUrl}`);
    }
}());


