/*global $*/
(function () {
    'use strict';

    const pickerInput = $('#pickerInput');
    const theButton = $('#theButton');
    const image = $('#thePic');
    const title = $('#title');
    const previous = $('#previous');
    const next = $('#next');

    let previousSelection = '';
    let pictures = [];
    let picsSize = 0;
    let peviousIndex = 0;

    getPics('smiley face');

    theButton.on('click', () => {
        if (pickerInput.val() !== previousSelection) {
            previousSelection = pickerInput.val();
            getPics(pickerInput.val());
        }
    });

    pickerInput.on('keyup', (event) => {
        if (event.keyCode === 13) {
            theButton.click();
        }
    });

    function getPics(selection) {
        $.getJSON(`https://api.flickr.com/services/feeds/photos_public.gne?tags=${selection}&format=json&jsoncallback=?`)
            .done((data) => {
                console.log(data);
                parsePics(data.items);
                showPic(0);
            })
            .fail((error) => {
                console.log(error);
            });
    }

    const parsePics = (pics) => {
        picsSize = pics.length;
        pictures = pics;
    };

    function showPic(picIndex) {
        let src;
        let theTitle;
        try {
            src = pictures[picIndex].media.m;
            theTitle = pictures[picIndex].title;
        } catch (error) {
            src = '';
            theTitle = '';
            console.log(error);
        }
        image.attr('src', src);
        title.text(theTitle);
    }

    next.on('click', () => {
        const pic = (peviousIndex+1 < picsSize) ? peviousIndex+1 : 0;
        showPic(pic);
        peviousIndex = pic;
    });

    previous.on('click', () => {
        const pic = (peviousIndex-1 >= 0) ? peviousIndex-1 : picsSize-1;
        showPic(pic);
        peviousIndex = pic;
    });


}());