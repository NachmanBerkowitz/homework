var app = app || {};

app.clock = (function () {
    'use strict';
    const clock = function () {
        const clockDiv = document.createElement('div');
        const hourSpan = document.createElement('span');
        const minuteSpan = document.createElement('span');
        const secondSpan = document.createElement('span');
        document.body.appendChild(clockDiv);
        clockDiv.appendChild(hourSpan);
        clockDiv.appendChild(minuteSpan);
        clockDiv.appendChild(secondSpan);

        clockDiv.style.backgroundColor = 'grey';
        clockDiv.style.maxWidth = 'fit-content';

        let tickTock;
        newTime();

        function newTime() {
            const d = new Date();
            const time = {
                hour: (d.getHours() > 12) ? d.getHours() - 12 : d.getHours(),
                minutes: d.getMinutes(),
                seconds: d.getSeconds(),
            };
            hourSpan.innerHTML = `${time.hour}:`;
            minuteSpan.innerHTML = `${minSecndsString(time.minutes)}:`;
            secondSpan.innerHTML = minSecndsString(time.seconds);
            tickTock = setInterval(() => {
                updateClock(time);
            }, 1000);
        }

        function updateClock(time) {
            let seconds = ++time.seconds;
            if(seconds === 60 ){
                let minutes = ++time.minutes;
                time.seconds = 0;
                seconds = 0;
                if (minutes === 30 || minutes === 60) {
                    clearInterval(tickTock);
                    newTime();
                    return;
                } else {
                    minuteSpan.innerHTML = `${minSecndsString(minutes)}:`;
                }
            }
            secondSpan.innerHTML = minSecndsString(seconds);
        }

        function minSecndsString(minOrSecnds) {
            return (minOrSecnds >= 10) ? minOrSecnds.toString() : `0${minOrSecnds}`;
        }

    };
    return clock;
}());