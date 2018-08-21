/*global $*/
(function () {
    'use strict';

    const genresList = $('#genresList');
    const videoListDiv = $('#videoList');
    const theVideo = $('#theVideo');
    const theVideoDomObject = theVideo[0];
    const videoControl = $('#videoControl');

    const initialLoad = (fileObject) => {
        fileObject.genres.forEach((genre, index) => {
            $(`<li>${genre}</li>`).appendTo(genresList)
                .on('click', () => {
                    videoListDiv.empty();
                    const videos = getVideosByGenre(fileObject, index);
                    videos.forEach((video) => {
                        const videoElem = $(`<p class="vidElem">${video.name}</p>`);
                        for (const key in video) {
                            if (video.hasOwnProperty(key)) {
                                const element = video[key];
                                videoElem.attr(`data-${key}`, `${element}`)
                            }
                        }
                        videoListDiv.append(videoElem);
                    });
                });
        });
    };

    videoListDiv.on('click', 'p.vidElem', (event) => {
        const vidInfo = event.target.dataset;
        theVideo.attr({ src: vidInfo.src, poster: vidInfo.img });
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

    videoControl.on('click', () => {
        theVideoDomObject.paused ? theVideoDomObject.play() :theVideoDomObject.pause();
    });

    const videoFileCall = $.getJSON('ajaxWithJson.json')
        .fail((error) => {
            console.log(error);
            window.alert('Failed to retrieve files.');
        })
        .done(initialLoad);
}());
