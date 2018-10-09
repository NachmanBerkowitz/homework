/*global $ */
(function() {
    'use strict';

    let dragging = false;
    let currentSelected;
    let previousSelected;
    let blinking;
    let offset;
    let zIndex = 2;
    let inter;
    const in_drawerHeight = '24px';
    const grow_button = $('#grow');
    const spin_button = $('#spin');
    const flip_button = $('#flip');
    const shrink_button = $('#shrink');
    const delete_button = $('#delete');
    const save_game_button = $('#save_game');
    const restart_game_button = $('#restart_game');
    const inDrawerCss = { position: 'initial', height: in_drawerHeight, zIndex: 0 };
    const clickInDrawerCss = { position: 'absolute', height: 'initial', zIndex: 1 };

    $(document)
        .on('mousedown', '.body_part, .body', function(event) {
            dragging = $(this);
            if(dragging.is('.in_drawer')){
                const sizeRatio = (this.naturalHeight)/parseInt(in_drawerHeight);
                offset = { x: event.offsetX*sizeRatio, y: event.offsetY*sizeRatio};
            }else{
                offset = { x: event.offsetX, y: event.offsetY };
            }
            if (!dragging.is(currentSelected)) {
                previousSelected = currentSelected;
            }
            currentSelected = dragging;
            if (!dragging.is('.body')) {
                dragging.css('z-index', zIndex++);
            }
            event.preventDefault();
        })
        .on('mousedown', function(event) {
            if (!$(event.target).is('.body_part, .body, .game_button')) {
                previousSelected = currentSelected;
                currentSelected = null;
            }
        })
        .on('mouseup', event => {
            if (dragging) {
                dragging = null;
            }
            event.preventDefault();
        })
        .mousemove(event => {
            if (dragging) {
                dragging.css({ top: event.pageY - offset.y, left: event.pageX - offset.x });
                event.preventDefault();
            }
        })
        .on('mouseup', blink);

    function blink(event) {
        if (!$(event.target).is('.game_button')) {
            if (currentSelected && !currentSelected.is('.in_drawer')) {
                let bright = false;
                clearInterval(blinking);
                if (previousSelected) {
                    previousSelected.removeClass('bright');
                }
                blinking = setInterval(() => {
                    if (currentSelected) {
                        if (!bright) {
                            currentSelected.addClass('bright');
                            bright = true;
                        } else {
                            currentSelected.removeClass('bright');
                            bright = false;
                        }
                    }
                }, 500);
            } else if (blinking) {
                clearInterval(blinking);
                if (previousSelected) {
                    previousSelected.removeClass('bright');
                }
            }
        }
    }

    const getParts = async function() {
        const fetch_parts = await fetch('parts.json');
        const parts = await fetch_parts.json();
        delete parts['blank'];
        for (const part_name in parts) {
            if (parts.hasOwnProperty(part_name)) {
                drawerBuilder(part_name);
            }
        }
        function drawerBuilder(part_name) {
            let partToShow;
            const drawer = {};
            drawer.partsTags = [];
            drawer.JQdrawer = $(`#${part_name}_drawer`);
            parts[part_name].forEach(part => {
                drawer.partsTags.push(part.tag);
            });
            if (drawer.partsTags.length > 1) {
                drawer.JQdrawer.prepend(`<p class="part_button next_part" id="${part_name}_button">next</p>`);
            }
            drawer.nextButton = drawer.JQdrawer.find('.next_part');
            drawer.current = 0;
            drawer.next = function() {
                partToShow = $(drawer.partsTags[drawer.current++])
                    .addClass('in_drawer')
                    .css({ transform: 'translateX(-115%)' })
                    .css(inDrawerCss)
                    .data({ deg: 0, flipped: false });
                partToShow[0].onload = () => {
                    partToShow.css('transform', 'translateX(0)');
                };
                drawer.JQdrawer.find('.part_holder').html(partToShow);
                if (drawer.current === drawer.partsTags.length) {
                    drawer.current = 0;
                }
            };
            drawer.JQdrawer.on('mousedown', '.in_drawer', function() {
                let moved = false;
                const currentPart = partToShow;
                currentPart.css(clickInDrawerCss);
                drawer.JQdrawer.on('mousemove.in_drawer', '.in_drawer', () => {
                    drawer.JQdrawer.off('.in_drawer').css('overflow', 'hidden');
                    $('#play').append(currentPart);
                    if(currentPart.is('.body')){
                        currentPart.css('z-index',0);
                    }
                    currentPart.removeClass('in_drawer').addClass('in_play');
                    moved = true;
                    drawer.next();
                }).on('mouseup.in_drawer', () => {
                    if (!moved) {
                        currentSelected = null;
                        currentPart.css(inDrawerCss);
                    }
                    drawer.JQdrawer.off('.in_drawer');
                });
            });
            drawer.nextButton.on('click', drawer.next);
            drawer.next();
        }
    };

    function startInterval(callback) {
        inter = setInterval(callback, 300);
    }
    function clearInter() {
        clearInterval(inter);
    }

    const grow = {
        event: {},
        grow: function(event) {
            grow.event = event;
            grow.oneGrow();
            startInterval(grow.oneGrow);
        },
        oneGrow: function() {
            if (currentSelected) {
                currentSelected.height(currentSelected.height() + grow.event.data.amount);
            }
        },
    };

    function spin() {
        oneSpin();
        startInterval(oneSpin);
    }
    function oneSpin() {
        if (currentSelected) {
            currentSelected.css('transform', `rotate(${(currentSelected.data().deg += 5)}deg)`);
            if (currentSelected.data().flipped) {
                currentSelected.data({ flipped: false });
                flip();
            }
        }
    }
    function flip() {
        if (currentSelected) {
            const matrix = currentSelected.css('transform');
            const a = matrix.substring(7, matrix.length - 1);
            const b = a.split(', ');
            currentSelected
                .css('transform', `matrix(${b[0] * -1},${b[1]},${b[2] * -1},${b[3]},0,0)`)
                .data({ flipped: !currentSelected.data().flipped });
        }
    }

    function deletePart() {
        if (currentSelected) {
            currentSelected.remove();
            currentSelected = null;
        }
    }

    function saveGame() {
        let zIndex = 1;
        const save_parts = Array.from(document.querySelectorAll('.in_play')).sort((a, b) => {
            return parseInt(a.style.zIndex) - parseInt(b.style.zIndex);
        }).map(part => {
            part.style.zIndex = zIndex++;
            return part.outerHTML;
        });
        localStorage.saved_game = JSON.stringify(save_parts);
        localStorage.zIndex = zIndex;
    }

    function restartGame() {
        $('.in_play').remove();
        getParts();
    }

    grow_button.on('mousedown', { amount: 5 }, grow.grow);
    shrink_button.on('mousedown', { amount: -5 }, grow.grow);
    spin_button.on('mousedown', spin);
    flip_button.on('click', flip);
    delete_button.on('click', deletePart);
    save_game_button.on('click', saveGame);
    restart_game_button.on('click', restartGame);
    $('.game_button')
        .on('mouseup', clearInter)
        .on('mouseleave', clearInter);

    function loadSavedGame() {
        if (localStorage.saved_game) {
            const parts = JSON.parse(localStorage.saved_game);
            parts.forEach(p => {
                $('#play').append($(p));
            });
            zIndex = JSON.parse(localStorage.zIndex);
        }
    }

    (function setup() {
        getParts();
        loadSavedGame();
    })();
})();
