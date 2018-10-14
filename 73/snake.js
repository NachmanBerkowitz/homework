/*global $*/
(function() {
    'use strict';
    class Level{
        constructor(levelNum,passScore){
            /**
             * @type {number}
             */
            this.levelNum = levelNum;
            this.passScore=passScore;
        }
        beforeSnakeMove(){}
        afterSnakeMove(){}
        ateApple(){}
    }

    const canvasContainer = document.getElementById('canvasContainer');
    const canvas = canvasContainer.querySelector('#theCanvas');
    const context = canvas.getContext('2d');
    const apple = document.createElement('img');
    apple.src = 'pics/apple.png';
    const snakeHead = document.createElement('img');
    snakeHead.src = 'pics/snakeHead.png';
    const crunchSound = document.getElementById('crunch');
    crunchSound.playbackRate = 1.5;
    const gameOverSound = document.getElementById('game_over');
    const scoreSpan = $('#score');

    let score = 0;
    
    let levelScore=0;
    let gameSpeed = 600;
    let currentLevel = 1;

    const LEFT = 37,
        UP = 38,
        RIGHT = 39,
        DOWN = 40;
    let direction = RIGHT;

    const snakeSize = 20;
    let headX = 0;
    let headY = 0;
    const snakeArray = [{ x: headX, y: headY }]; //an array of cuurent position of snake parts

    let appleX = -1;
    let appleY = 0;

    let gameRunning; //for setInterval
    let hue = 0; //for color of snake

    function resizeCanvas() {
        canvas.width = window.innerWidth - 2;
        canvas.height = canvasContainer.offsetHeight;
    }
    function render() {
        levels[currentLevel].beforeSnakeMove();

        gameRunning = setInterval(() => {
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

            levels[currentLevel].afterSnakeMove();

            const { x, y } = snakeArray[0];
            context.fillStyle = '#ffffff';
            context.beginPath();
            context.rect(x, y,snakeSize,snakeSize);
            context.fill();
            context.fillStyle = `hsl(${(hue += 2)}, 100%, 50%)`;
            context.beginPath();
            context.rect(headX, headY,snakeSize,snakeSize);
            context.fill();
            if (crash()) {
                gameOver();
                return;
            }

            snakeArray.push({ x: headX, y: headY });

            if (ateApple()) {
                crunchSound.currentTime = 0;
                crunchSound.play();
                score++;
                scoreSpan.text(score);
                levelScore++;
                levels[currentLevel].ateApple();
                if(levelComplete()){
                    wonLevel();
                    return;
                }
                placeApple();
                clearInterval(gameRunning);
                if (gameSpeed >= 100) {
                    gameSpeed -= 50;
                }
                hue += 10;
                render();
            } else {
                snakeArray.shift();
            }
        }, gameSpeed);
    }

    function placeApple() {
        do {
            appleX = getRandomNumber(0, canvas.width - snakeSize);
            appleY = getRandomNumber(0, canvas.height - snakeSize);
            appleX = appleX - (appleX % snakeSize);
            appleY = appleY - (appleY % snakeSize);
        } while (occupied(appleX, appleY));
        context.drawImage(apple, appleX, appleY, snakeSize, snakeSize);
    }
    function ateApple() {
        return headX === appleX && headY === appleY;
    }
    function crash() {
        return (
            headX < 0 ||
            headY < 0 ||
            headX + snakeSize >= canvas.offsetWidth - 1 ||
            headY + snakeSize >= canvas.offsetHeight - 1 ||
            occupied(headX, headY)
        );
    }
    function gameOver() {
        clearInterval(gameRunning);
        $(canvasContainer).html('GAME OVER');
        gameOverSound.play();
    }
    function gameWon(){
        clearInterval(gameRunning);
        $(canvasContainer).html('GAME WON');
    }
    function occupied(spotX, spotY) {
        return snakeArray.some(bodyPart => bodyPart.x === spotX && bodyPart.y === spotY);
    }
    function levelComplete(){
        return levels[currentLevel].passScore === levelScore;
    }
    function prepForNewLevel(){
        clearInterval(gameRunning);
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        levelScore=0;
        gameSpeed = 600;
        currentLevel++;
        headX = 0;
        headY = 0;
        direction = RIGHT;
        placeApple();
        snakeArray.splice(0,snakeArray.length,{ x: headX, y: headY });
        render();
    }
    function wonLevel(){
        if(levels.length-1 === currentLevel){
            gameWon();
        }else{
            prepForNewLevel();
        }
    }
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    (function setup() {
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        apple.onload = placeApple;
        snakeHead.onload = render;
        context.fillStyle = `hsl(${hue}, 100%, 50%)`;
        context.beginPath();
        context.rect(headX, headY,snakeSize,snakeSize);
        context.fill();
        document.addEventListener('keydown', event => {
            switch (
                event.keyCode // note, keyCode is DEPRECATED
            ) {
            case LEFT:
            case UP:
            case RIGHT:
            case DOWN:
                direction = event.keyCode;
            }
        });
    })();

    
    const levelZero=new Level(0,0);
    const levelOne = new Level(1,1);
    const levelTwo = new Level(2,20);
    levelTwo.walls = function(){
        const verticalWallHeight = canvas.innerHeight-(canvas.innerHeight%snakeSize)*(3/4);
        const horizontalWallWidth = canvas.innerWidth-(canvas.innerWidth%snakeSize)*(3/4);
    };
    /**
     * to hold methods and variables of levels
     * @type {Object[]}
     */
    const levels = [levelZero,levelOne,levelTwo];//to hold methods and variables of levels
})();

