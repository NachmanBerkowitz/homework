/*global $*/
(function() {
    'use strict';
    const canvasContainer = document.getElementById('canvasContainer');
    const canvas = canvasContainer.querySelector('#theCanvas');
    const context = canvas.getContext('2d');
    let score = 0;
    const scoreSpan = $('#score');
    const LEFT = 37,
        UP = 38,
        RIGHT = 39,
        DOWN = 40;
    const snakeSize =20;
    const crunchSound = document.getElementById('crunch');
    const gameOverSound = document.getElementById('game_over');
    let headX = 0;
    let headY = 0;
    let direction = RIGHT;
    let appleX = -1;
    let appleY = 0;
    let gameSpeed = 600;

    function resizeCanvas() {
        canvas.width = window.innerWidth - 2;
        canvas.height = canvasContainer.offsetHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    const snakeHead = document.createElement('img');
    snakeHead.src = 'pics/snakeHead.png';
    context.strokeStyle = '#BADA55';
    context.lineCap = 'square';
    context.lineWidth = snakeSize;
    context.lineTo(headX + snakeSize / 2, headY + snakeSize / 2);
    context.stroke();
    snakeHead.onload = render;
    const snakeArray = [{x:headX,y:headY}];
    console.log(snakeArray);
    function render() {
        let gameRunning = setInterval(() => {
            switch (direction) {
            case LEFT:
                headX -= snakeSize;
                break;
            case UP:
                headY -= snakeSize;
                break;
            case RIGHT:
                headX += snakeSize;
                break;
            case DOWN:
                headY += snakeSize;
                break;
            }
            const{x,y}=snakeArray[0];
            context.strokeStyle = '#ffffff';
            context.beginPath();
            console.log(x,y);
            context.lineTo(x+ snakeSize / 2, y + snakeSize / 2);
            context.stroke();
            context.strokeStyle = '#BADA55';
            context.beginPath();
            context.lineTo(headX + snakeSize / 2, headY + snakeSize / 2);
            context.stroke();
            
            snakeArray.push({x:headX,y:headY});
            if (
                headX < 0 ||
                headY < 0 ||
                headX + snakeSize >= canvas.offsetWidth - 1 ||
                headY + snakeSize >= canvas.offsetHeight - 1
            ) {
                clearInterval(gameRunning);
                $(canvasContainer).html('GAME OVER');
                gameOverSound.play();
            }
            if (headX === appleX && headY === appleY) {
                crunchSound.currentTime = 0;
                crunchSound.play();
                score++;
                scoreSpan.text(score);
                placeApple();
                clearInterval(gameRunning);
                gameSpeed -= 50;
                render();
            }else{
                snakeArray.shift();
            }
        }, gameSpeed);
    }
    const apple = document.createElement('img');
    apple.src = 'pics/apple.png';
    apple.onload = placeApple;
    function placeApple() {
        appleX = getRandomNumber(0, canvas.width - snakeSize);
        appleY = getRandomNumber(0, canvas.height - snakeSize);
        appleX = appleX - (appleX % snakeSize);
        appleY = appleY - (appleY % snakeSize);
        context.drawImage(apple, appleX, appleY, snakeSize, snakeSize);
    }
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    document.addEventListener('keydown', event => {
        switch (
            event.keyCode // note keyCode is DEPRECATED
        ) {
        case LEFT:
        case UP:
        case RIGHT:
        case DOWN:
            direction = event.keyCode;
        }
    });
})();
