/*global $*/
(function () {
    'use strict';

    const genresList = $('#genresList');
    const videoListDiv = $('#videoList');
    const theVideo = $('#theVideo');
    const theVideoDomObject = theVideo[0];
    const videoControl = $('#videoControl');
    const videoStop = $('#videoStop');

    var selectdGenreElem = $('');
    var selectedVideoElem = $('');

    const initialLoad = (fileObject) => {
        fileObject.genres.forEach((genre, index) => {
            $(`<li>${genre}</li>`).appendTo(genresList)
                .on('click', (event) => {
                    resetTextToInitial(selectdGenreElem);
                    selectdGenreElem = $(event.currentTarget);
                    setTextToX_Large(selectdGenreElem);
                    videoListDiv.empty();
                    const videos = getVideosByGenre(fileObject, index);
                    videos.forEach((video) => {
                        const videoElem = $(`<div class="vidElem">
                            <p>${video.name}</p>
                            <div>
                            <img src="${video.img}" class="video_image">
                            </div>
                            </div>`);
                        for (const key in video) {
                            if (video.hasOwnProperty(key)) {
                                const element = video[key];
                                videoElem.attr(`data-${key}`, `${element}`);
                            }
                        }
                        videoListDiv.append(videoElem);
                    });
                });
        });
    };

    videoListDiv.on('click', 'div.vidElem', (event) => {
        resetTextToInitial(selectedVideoElem);
        selectedVideoElem = $(event.currentTarget);
        setTextToX_Large(selectedVideoElem);
        const vidInfo = selectedVideoElem[0].dataset;
        theVideo.attr({ src: vidInfo.src, poster: vidInfo.img });
        videoControl.css('display', 'block');
        videoStop.css('display', 'block');
        theVideoDomObject.play();
    });

    const getVideosByGenre = (fileObject, GenreIndex) => {
        const videos = [];
        fileObject.videoList.forEach((video) => {
            video.genre.forEach((genreNum) => {
                if (genreNum === GenreIndex) {
                    videos.push(video);
                }
            });

        });
        return videos;
    };

    const setTextToX_Large = (elem) => {
        elem.css('fontSize', 'x-large');
    };

    const resetTextToInitial = (elem) => {
        elem.css('fontSize', 'initial');
    };

    videoControl.on('click', () => {
        theVideoDomObject.paused ? theVideoDomObject.play() : theVideoDomObject.pause();
    });

    videoStop.on('click', () => {
        theVideoDomObject.pause();
        theVideoDomObject.currentTime = 0;
    });

    $.getJSON('ajaxWithJson.json')
        .fail((error) => {
            console.log(error);
            window.alert('Failed to retrieve files.');
        })
        .done(initialLoad);
}());
