/*global $*/
(function () {
    'use strict';
    let dragging = false;
    let wasDragged;
    let inSandbox = $();
    let offset;
    let zIndex = 1;
    let deg = 5;
    const sandbox = $('#sandbox');
    const left_button = $('#left_button');
    const right_button = $('#right_button');
    const copy_machine = $('#copy_machine');
    $(document).on('mousedown', '.body_part, .body', function (event) {
        offset = { x: event.offsetX, y: event.offsetY };
        dragging = $(this);
        dragging.css('z-index', zIndex++);
        event.preventDefault();
    }).on('mouseup', event => {
        if (dragging) {
            wasDragged = dragging;
            dragging = null;
            const sandbox_left = sandbox[0].getBoundingClientRect().left;
            const _wasDragged_ = {
                left: parseInt(wasDragged[0].getBoundingClientRect().left),
                right: parseInt(wasDragged[0].getBoundingClientRect().right)
            };
            if (_wasDragged_.left > sandbox_left && wasDragged.css('z-index') !== inSandbox.css('z-index')) {
                inSandbox.css('left', `${sandbox_left - (_wasDragged_.right - _wasDragged_.left) - 80}px`);
                inSandbox.removeClass('in_sandbox');
                inSandbox = wasDragged;
                inSandbox.addClass('in_sandbox');
            } else if (inSandbox[0] && parseInt(inSandbox[0].getBoundingClientRect().left) < sandbox_left) {
                inSandbox.removeClass('in_sandbox');
                inSandbox = $();
                deg = 5;
            }
        }
        event.preventDefault();
    }).mousemove(event => {
        if (dragging) {
            dragging.css({ top: event.clientY - offset.y, left: event.clientX - offset.x });
            event.preventDefault();
        }
    });

    $('#set_rotate').on('click', function () {
        right_button.text('clock-wise');
        left_button.text('counter-clock-wise');
    });
    $('#set_size').on('click', function () {
        left_button.text('smaller');
        right_button.text('bigger');
    });
    right_button.on('click', function () {
        if (right_button.text() === 'bigger') {
            const height = parseInt(inSandbox.css('height'));
            const width = parseInt(inSandbox.css('width'));
            const newHeight = height + 5;
            const newWidth = (newHeight * width) / height;
            inSandbox.css({ height: `${newHeight}`, width: `${newWidth}` });
        } else {
            deg = inSandbox.data().deg || 0;
            inSandbox.css('transform', `rotate(${deg += 5}deg)`);
            inSandbox.data({ deg });
        }
    });
    left_button.on('click', function () {
        if (left_button.text() === 'smaller') {
            const height = parseInt(inSandbox.css('height'));
            const width = parseInt(inSandbox.css('width'));
            const newHeight = height - 5;
            const newWidth = (newHeight * width) / height;
            inSandbox.css({ height: `${newHeight}`, width: `${newWidth}` });
        } else {
            deg = inSandbox.data().deg || 0;
            inSandbox.css('transform', `rotate(${deg += 5}deg)`);
            inSandbox.data({ deg });
        }
    });
    $('#copy').on('click', function () {
        if (inSandbox[0]) {
            $(`<img src=${inSandbox[0].src}>`).appendTo(copy_machine)
                .addClass('body_part new');
        }
    });
    $('#delete').on('click', function () {
        inSandbox.remove();
        $(document).trigger('mouseup');
    });
    $('#save').on('click', function () {
        const oldParts = $('.old');
        const newParts = $('.new');
        const oldPartsArray = saveParts(oldParts);
        const newPartsArray = saveParts(newParts);
        localStorage.oldParts = JSON.stringify(oldPartsArray);
        localStorage.newParts = JSON.stringify(newPartsArray);
        localStorage.p_headZindex = zIndex;
    });
    function saveParts(parts) {
        const partsArray = [];
        for (let part of parts) {
            const o = {
                src: part.src,
                style: part.style.cssText,
                class: part.className,
                id: part.id,
                parentId: part.parentElement.id
            };
            partsArray.push(o);
        }
        return partsArray;
    }
    $('#reset').on('click', () => {
        localStorage.removeItem('oldParts');
        document.location.reload();
    });

    const tracks = $('.bg_music');
    tracks.each(function (index, track) {
        const nextTrack = (index + 1 < tracks.length) ? index + 1 : 0;
        $(track).on('ended', function () {
            tracks[nextTrack].play();
        });
    });

    (function setup() {
        if (localStorage.oldParts) {
            const oldParts = JSON.parse(localStorage.oldParts);
            oldParts.forEach(part => {
                $(`#${part.id}`).attr('style', part.style);
            });
            zIndex = JSON.parse(localStorage.p_headZindex);
            const newParts = JSON.parse(localStorage.newParts);
            newParts.forEach((part) => {
                $(`<img src=${part.src}>`)
                    .attr({ id: part.id, class: part.class, style: part.style })
                    .appendTo(`#${part.parentId}`);
            });
        }
        tracks[0].play();
    }());
}());