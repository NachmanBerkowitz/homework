/*global $*/
(function() {
    'use strict';
    class Level {
        constructor(levelNum, passScore) {
            /**
             * @type {number}
             */
            this.levelNum = levelNum;
            this.passScore = passScore;
        }
        beforeLevel() {}
        beforeSnakeMove() {}
        afterSnakeMove() {}
        ateApple() {}
    }

    const gameInfo = $('#game_info');
    const canvas = document.getElementById('theCanvas');
    const context = canvas.getContext('2d');
    const apple = document.createElement('img');
    apple.src = 'pics/apple.png';
    const crunchSound = document.getElementById('crunch');
    crunchSound.playbackRate = 1.5;
    const gameOverSound = document.getElementById('game_over');
    const scoreSpan = $('#score');
    const levelSpan = $('#level');

    let score = 0;

    let levelScore = 0;
    let gameSpeed = 600;
    let currentLevel = 1;

    const LEFT = 37,
        UP = 38,
        RIGHT = 39,
        DOWN = 40;
    let direction = RIGHT;

    /**
     * the size of the "building blocks" of game. screenUnit * screenUnit px
     */
    const screenUnit = 20;
    let headX = 0;
    let headY = 0;
    /**
     * an array of cuurent position of snake parts
     */
    const snakeArray = [{ x: headX, y: headY }];
    /**
     * an array of occupied spotsn not incliding the snake
     */
    const occupiedArray = [];
    let appleX = -1;
    let appleY = 0;

    canvas.width = window.innerWidth - 2 - ((window.innerWidth - 2) % screenUnit);
    const tempHeight = window.innerHeight - 2 - gameInfo.height();
    canvas.height = tempHeight - (tempHeight % screenUnit);
    /**
     * width of canvas in screenUnits
     */
    const canvasWidth = canvas.width / screenUnit;
    /**
     * height of canvas in screenUnits
     */
    const canvasHeight = canvas.height / screenUnit;

    /**
     * for setInterval
     */
    let gameRunning;
    /**
     * for color of snake
     */
    let hue = 0;

    function render() {
        levels[currentLevel].beforeSnakeMove();

        gameRunning = setInterval(() => {
            switch (direction) {
            case LEFT:
                headX -= screenUnit;
                break;
            case UP:
                headY -= screenUnit;
                break;
            case RIGHT:
                headX += screenUnit;
                break;
            case DOWN:
                headY += screenUnit;
                break;
            }

            levels[currentLevel].afterSnakeMove();

            if (crash()) {
                gameOver();
                return;
            }

            const { x: tailX, y: tailY } = snakeArray[0];
            context.fillStyle = '#ffffff';
            context.beginPath();
            context.rect(tailX, tailY, screenUnit, screenUnit);
            context.fill();
            context.fillStyle = `hsl(${(hue += 2)}, 100%, 50%)`;
            context.beginPath();
            context.rect(headX, headY, screenUnit, screenUnit);
            context.fill();

            snakeArray.push({ x: headX, y: headY });

            if (ateApple()) {
                crunchSound.currentTime = 0;
                crunchSound.play();
                score++;
                scoreSpan.text(score);
                levelScore++;
                levels[currentLevel].ateApple();
                if (levelComplete()) {
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

    function placeSnake(){
        context.fillStyle = `hsl(${hue}, 100%, 50%)`;
        context.beginPath();
        context.rect(headX, headY, screenUnit, screenUnit);
        context.fill();
    }
    function placeApple() {
        do {
            appleX = getRandomNumber(0, canvas.width - screenUnit);
            appleY = getRandomNumber(0, canvas.height - screenUnit);
            appleX = appleX - (appleX % screenUnit);
            appleY = appleY - (appleY % screenUnit);
        } while (occupied(appleX, appleY));
        context.drawImage(apple, appleX, appleY, screenUnit, screenUnit);
    }
    function ateApple() {
        return headX === appleX && headY === appleY;
    }
    function crash() {
        return (
            headX < 0 ||
            headY < 0 ||
            headX + screenUnit >= canvas.offsetWidth - 1 ||
            headY + screenUnit >= canvas.offsetHeight - 1 ||
            occupied(headX, headY)
        );
    }
    function gameOver() {
        clearInterval(gameRunning);
        gameInfo.prepend('<span>GAME OVER</span>');
        gameOverSound.play();
    }
    function gameWon() {
        clearInterval(gameRunning);
        gameInfo.prepend('<span>GAME WON</span>');
    }
    function occupied(spotX, spotY) {
        return (
            snakeArray.some(bodyPart => bodyPart.x === spotX && bodyPart.y === spotY) ||
            occupiedArray.some(thing => thing.x === spotX && thing.y === spotY)
        );
    }
    function levelComplete() {
        return levels[currentLevel].passScore === levelScore;
    }
    function prepForNewLevel() {
        clearInterval(gameRunning);
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        levelScore = 0;
        gameSpeed = 600;
        currentLevel++;
        levelSpan.text(currentLevel);
        headX = 0;
        headY = 0;
        direction = RIGHT;
        snakeArray.splice(0, snakeArray.length, { x: headX, y: headY });
        occupiedArray.splice(0, occupiedArray.length);
    }
    function wonLevel() {
        if (levels.length - 1 === currentLevel) {
            gameWon();
        } else {
            prepForNewLevel();
            levels[currentLevel].beforeLevel();
            placeSnake();
            placeApple();
            render();
        }
    }
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const levelNone = new Level(0, 0);
    const levelOne = new Level(1, 11);
    const levelTwo = new Level(2, 10);
    const levelThree = new Level(3, 11);
    levelTwo.beforeLevel = function() {
        gameSpeed = 570;
        const unitsFromEdge = 4;
        const horizontalWallStartX = screenUnit * unitsFromEdge;
        const horizontalWallStartY = Math.floor(canvasHeight / 2) * screenUnit;
        const horizontalWallLength = canvasWidth * screenUnit - screenUnit * (unitsFromEdge * 2);
        context.beginPath();
        context.rect(horizontalWallStartX, horizontalWallStartY, horizontalWallLength, screenUnit);
        context.fillStyle = 'black';
        context.fill();
        for (
            let wallPartX = horizontalWallStartX;
            wallPartX < horizontalWallStartX + horizontalWallLength;
            wallPartX += screenUnit
        ) {
            occupiedArray.push({ x: wallPartX, y: horizontalWallStartY });
        }
    };
    levelThree.beforeLevel = function() {
        gameSpeed = 540;
        const unitsBtwnWalls = 3;
        const wallOneHeight = Math.floor((canvasHeight - unitsBtwnWalls) / 2) * screenUnit;
        const wallTwoHeight = Math.ceil((canvasHeight - unitsBtwnWalls) / 2) * screenUnit;
        const wallTwoStartY = wallOneHeight + screenUnit * unitsBtwnWalls;
        const wallX = Math.floor(canvasWidth / 2) * screenUnit;
        context.beginPath();
        context.rect(wallX, 0, screenUnit, wallOneHeight);
        context.fillStyle = 'black';
        context.fill();
        context.beginPath();
        context.rect(wallX, wallTwoStartY, screenUnit, wallTwoHeight);
        context.fillStyle = 'black';
        context.fill();
        for (let wallPartY = 0; wallPartY < wallOneHeight; wallPartY += screenUnit) {
            occupiedArray.push({ x: wallX, y: wallPartY });
        }
        for (let wallPartY = wallTwoStartY; wallPartY < wallTwoStartY+wallTwoHeight; wallPartY += screenUnit) {
            occupiedArray.push({ x: wallX, y: wallPartY });
        }
    };
    /**
     * to hold methods and variables of levels
     * @type {Level[]}
     */
    const levels = [levelNone, levelOne, levelTwo, levelThree]; //to hold methods and variables of levels
    
    (function setup() {
        levels[currentLevel].beforeLevel();
        placeSnake();
        apple.onload = placeApple;
        render();
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
})();
