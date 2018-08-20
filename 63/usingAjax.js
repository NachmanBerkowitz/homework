/* global $ */
(function () {
    'use strict';
    const dataViewer = $('#loadedDataViewer');
    const loadButton = $('button');


    const waiting = () => {
        dataViewer.css({ 'font-size': '5em', 'transition': 'all 10s ease' , 'border' : 'none'});
        dataViewer.html('hold on');
    };

    const finishedWaiting = ()=>{
        dataViewer.css({ 'font-size': 'inherit', 'transition': 'none' });
    };

    const postToScreen = (data) => {


        if (data.length === 0) {
            data = 'Empty file found';
        }
        dataViewer.css('border', 'black solid 1px');
        dataViewer.text(data);
    };

    $(loadButton).on('click', () => {
        const userInput = $('#userInput').val();
        if (userInput.length !== 0) {
            waiting();
            setTimeout(() => {
                finishedWaiting();
                $.get(userInput, postToScreen)
                    .fail(postToScreen('Some error has accured. Try a diferent file'));
            }, 3000);
        }
    });


}());