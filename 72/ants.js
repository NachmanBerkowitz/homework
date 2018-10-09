/*global $*/
(function() {
    'use strict';
    const canvasContainer = document.getElementById('canvasContainer');
    const canvas = canvasContainer.querySelector('#theCanvas');
    const addButton = $('#addAnt');
    const colorButton = $('#color');
    const amountButton = $('#amount');
    const amount_num = $('#amount_num');
    const addButtonText = 'New Ants';
    const context = canvas.getContext('2d');
    function resizeCanvas() {
        canvas.width = window.innerWidth - 2;
        canvas.height = canvasContainer.offsetHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    const moveAmount = 1;
    class Ant {
        constructor(color) {
            this.height = 10;
            this.width =10;
            this.x = canvas.offsetWidth / 2;
            this.y = canvas.offsetHeight / 2;
            this.color = color;
            this.turns = {
                x: 0,
                y: 0,
            };
            this.move = {
                x: 0,
                y: 0,
            };
        }
        crawl() {
            this.movementX();
            this.movementY();
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
        direction(plane) {
            this.turns[plane] = Ant.getRandomNumber(1, 300);
            const movement = Ant.getRandomNumber(-moveAmount, moveAmount);
            this.move[plane] = movement;
            return movement;
        }
        movementX() {
            let next_x;
            if (this.turns['x'] > 0) {
                next_x = this.x + this.move['x'];
                this.turns['x']--;
            } else {
                next_x = this.x + this.direction('x');
            }
            if (next_x < 0 || next_x > (canvas.offsetWidth-1)-this.width) {
                this.move['x'] *= -1;
                next_x = this.x + this.move['x'];
            }
            this.x = next_x;
        }
        movementY() {
            let next_y;
            if (this.turns['y'] > 0) {
                next_y = this.y + this.move['y'];
                this.turns['y']--;
            } else {
                next_y = this.y + this.direction('y');
            }
            if (next_y < 0 || next_y > (canvas.offsetHeight-1)-this.height) {
                this.move['y'] *= -1;
                next_y = this.y + this.move['y'];
            }
            this.y = next_y;
        }

        static getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    }
    const theAnts = [];
    setInterval(() => {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        theAnts.forEach(ant => {
            ant.crawl();
            
        });
    }, 75);
    addButton.on('click', () => {
        for (let i = 0; i < amountButton[0].value; i++) {
            theAnts.push(new Ant(colorButton.val()));
        }
    });
    $('#color').on('change', color_clicker);
    function color_clicker() {
        $('#buttons').css('backgroundColor', `${colorButton.val()}AA`);
    }
    amountButton.on('change', amountChange);
    function amountChange() {
        amount_num.text(this.value);
        if (this.value === '1') {
            addButton.text(addButtonText.slice(0, addButtonText.length - 1));
        } else addButton.text(addButtonText);
    }
    (function setup(){
        colorButton.val('#0000ff');
        color_clicker();
    }());
})();
