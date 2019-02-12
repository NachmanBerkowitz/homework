/*global $*/
(function() {
    'use strict';
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
    let baseSpeed = 600;
    let gameSpeed;
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
     * an array of occupied spots not including the snake
     */
    const occupiedArray = [];
    let appleX = -1;
    let appleY = 0;

    canvas.width = window.innerWidth - 2 - ((window.innerWidth - 2) % screenUnit);
    const tempHeight = window.innerHeight - 2 - gameInfo.height();
    canvas.height = tempHeight - (tempHeight % screenUnit);
    /**
     * width of canvas in `screenUnits`
     */
    const canvasWidth = canvas.width / screenUnit;
    /**
     * height of canvas in `screenUnits`
     */
    const canvasHeight = canvas.height / screenUnit;

    /**
     * for the return of `setInterval()`
     */
    let gameRunning;
    /**
     * for color of snake
     */
    let hue = 0;

    function render() {
        levels[currentLevel].beforeSnakeMove();

        gameRunning = setInterval(() => {
            setNewSnakePosition();

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
                if (gameSpeed >= 80) {
                    gameSpeed -= 50;
                    clearInterval(gameRunning);
                    render();
                }
                hue += 10;
            } else {
                snakeArray.shift();
            }
        }, gameSpeed);
    }

    function placeSnake() {
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
    /**
     * sets the new position of the snake head, moving it one over in the direction of players last input
     */
    function setNewSnakePosition() {
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
    }
    function ateApple() {
        return headX === appleX && headY === appleY;
    }
    /**
     * Calculate if snake crashed into an obstacle.
     * @returns {boolean} Returns true if crashed.
     */
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
    /**
     * Check if a spot is occupied by snake or other obstacles (besides walls).
     * @param {number} spotX The x of the spot we are checking.
     * @param {number} spotY The y of the spot we are checking.
     * @return {boolean} returns true if occupied.
     */
    function occupied(spotX, spotY) {
        return (
            snakeArray.some(bodyPart => bodyPart.x === spotX && bodyPart.y === spotY) ||
            occupiedArray.some(thing => thing.x === spotX && thing.y === spotY)
        );
    }
    function levelComplete() {
        return levelScore === levels[currentLevel].passScore;
    }
    function prepForNewLevel() {
        clearInterval(gameRunning);
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        levelScore = 0;
        gameSpeed = 600;
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
            levels[currentLevel].levelWon();
            currentLevel++;
            nextLevel();
        }
    }
    function nextLevel() {
        prepForNewLevel();
        levels[currentLevel].beforeLevel();
        gameSpeed = baseSpeed - levels[currentLevel].speed;
        placeSnake();
        placeApple();
        render();
    }
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * to hold methods and variables of levels
     * @type {Level[]}
     */
    const levels = [];
    /**
     * The level Api to construct the particulars of a level, and to define its lifecycle hooks.
     * @api
     */
    class Level {
        /**
         * To construct a Level
         * @param {number} levelNum the number of the level
         * @param {number} passScore the score that must be accrued in this level to move on to the next level
         * @param {number} speed how many mllsec to subtract from base speed per turn making the snake move faster.
         */
        constructor(levelNum, passScore, speed = 0) {
            /**
             * @type {number}
             */
            this.levelNum = levelNum;
            this.passScore = passScore;
            /**
             * how many mllsec to subtract from `baseSpeed`, making the snake move faster.
             */
            this.speed = speed;
            /**
             * An object containing the particulars of a level. (Obstacles ect.)
             */
            this.stuff = {};
            levels[levelNum] = this;
        }
        beforeLevel() {}
        beforeSnakeMove() {}
        afterSnakeMove() {}
        ateApple() {}
        levelWon() {}
    }

    const infiniteLevel = new Level(0, -1, 350);
    const levelOne = new Level(1, 11);
    const levelTwo = new Level(2, 10, 30);
    const levelThree = new Level(3, 11, 60);
    const levelFour = new Level(4, 10, 70);

    levelTwo.beforeLevel = function() {
        const unitsFromEdge = 5;
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
        for (
            let wallPartY = wallTwoStartY;
            wallPartY < wallTwoStartY + wallTwoHeight;
            wallPartY += screenUnit
        ) {
            occupiedArray.push({ x: wallX, y: wallPartY });
        }
    };
    levelFour.stuff = {
        gateBrightness: 50,
        gateColor: `hsl(60,100%,${levelFour.gateBrightness}%)`,

        gateColorThrob() {
            const stuff = levelFour.stuff;
            let brightness = true;
            if (stuff.gateBrightness >= 70 || stuff.gateBrightness <= 10) {
                brightness = !brightness;
            }
            if (brightness) {
                stuff.gateBrightness += 5;
            } else {
                stuff.gateBrightness -= 5;
            }
            stuff.gateColor = `hsl(60,100%,${stuff.gateBrightness}%)`;
            stuff.gates.forEach(gate => {
                context.beginPath();
                context.rect(gate.x, gate.y, screenUnit, screenUnit);
                context.fillStyle = stuff.gateColor;
                context.fill();
            });
        },
    };
    levelFour.beforeLevel = function() {
        const stuff = this.stuff;
        const fullVerticalWallHeight = canvasHeight * screenUnit;
        const wallX = Math.floor(canvasWidth / 2) * screenUnit;
        context.beginPath();
        context.rect(wallX, 0, screenUnit, fullVerticalWallHeight);
        context.fillStyle = 'black';
        context.fill();
        for (let wallPartY = 0; wallPartY < fullVerticalWallHeight; wallPartY += screenUnit) {
            occupiedArray.push({ x: wallX, y: wallPartY });
        }
        const gateOneSpot = {
            x: Math.floor(canvasWidth / 4) * screenUnit,
            y: Math.floor(canvasHeight / 2) * screenUnit,
        };
        const gateTwoSpot = {
            x: Math.floor(canvasWidth * (3 / 4)) * screenUnit,
            y: Math.floor(canvasHeight / 2) * screenUnit,
        };
        stuff.gates = [gateOneSpot, gateTwoSpot];
        stuff.gates.forEach(gate => {
            occupiedArray.push(gate);
        });
        context.beginPath();
        context.rect(gateOneSpot.x, gateOneSpot.y, screenUnit, screenUnit);
        context.fillStyle = 'yellow';
        context.fill();
        context.beginPath();
        context.rect(gateTwoSpot.x, gateTwoSpot.y, screenUnit, screenUnit);
        context.fillStyle = 'yellow';
        context.fill();
        stuff.intrvl = setInterval(stuff.gateColorThrob, 150);
    };
    levelFour.afterSnakeMove = function() {
        const gates = levelFour.stuff.gates;
        gates.some((entrance, i) => {
            const bool = headX === entrance.x && headY === entrance.y;
            if (bool) {
                const exit = gates[gates.length - 1 - i];
                headX = exit.x;
                headY = exit.y;
                setNewSnakePosition();
            }
            return bool;
        });
    };
    levelFour.levelWon = function() {
        clearInterval(levelFour.stuff.intrvl);
    };

    function gameSetup() {
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
        nextLevel();
    }

    (function preGame() {
        $('#level_picker')
            .prop('max', `${levels.length - 1}`)
            .on('change', amountChange);
        $('#speed_picker').on('change', speedChange);
        $('#go').on('click', startGame);
        $('#freePlay').on('click', () => {
            $('#picker_div').hide();
            $('#level').text('Free Play');
            currentLevel = 0;
            gameSetup();
        });
        function amountChange() {
            levelSpan.text(this.value);
        }
        function speedChange() {
            const speedSpan = $('#speed');
            const speed = parseInt(this.value);
            if (speed === 1) {
                speedSpan.text('normal');
            } else if (speed === 2) {
                speedSpan.text('fast');
            } else if (speed === 3) {
                speedSpan.text('very fast');
            }
        }
        function startGame() {
            $('#picker_div').hide();
            currentLevel = +$('#level_picker').val();
            baseSpeed = 600 - ($('#speed_picker').val() - 1) * 200;
            gameSetup();
        }
    })();
})();
