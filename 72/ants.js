/*global $*/
(function() {
    'use strict';
    const canvasContainer = document.getElementById('canvasContainer');
    const canvas = canvasContainer.querySelector('#theCanvas');
    const addButton = $('#addAnt');
    const colorRange = $('#color');
    const speedRange = $('#speed');
    const sizeRange = $('#size');
    const antAmountRange = $('#amount');
    const amountRanges = $('.range');
    let moves_per_second = 13;
    const addButtonText = 'New Ants';
    const context = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth - 2;
        canvas.height = canvasContainer.offsetHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    class Ant {
        constructor(color,size) {
            this.width = size;
            this.height = this.width/2;
            this.x = canvas.offsetWidth / 2;
            this.y = canvas.offsetHeight / 2;
            this.color = color;
            this.move = {
                x: 0,
                y: 0,
            };
            this.fixedTurns = 0;
        }
        crawl() {
            if (--this.fixedTurns <= 0) {
                this.setDirection();
            }
            this.movementX();
            this.movementY();
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
        movementX() {
            let next_x = this.x + this.move.x;
            if (next_x < 0 || next_x > canvas.offsetWidth - 1 - this.width) {
                next_x = this.x + (this.move.x *= -1);
            }
            this.x = next_x;
        }
        movementY() {
            let next_y = this.y + this.move.y;
            if (next_y < 0 || next_y > canvas.offsetHeight - 1 - this.height) {
                next_y = this.y + (this.move.y *= -1);
            }
            this.y = next_y;
        }

        getRandomAmountOfTurns() {
            return Ant.getRandomNumber(1, 50);
        }
        setDirection() {
            this.move.x = Ant.getRandomNumber(-5,5);
            this.move.y = Ant.getRandomNumber(-5,5);
            this.fixedTurns = this.getRandomAmountOfTurns();
        }
        static getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    }
    const theAnts = [];
    let crawl;
    function intervalStarter(){
        const mlsec = parseInt(1000/moves_per_second);
        const crawl =setInterval(() => {
            context.clearRect(0, 0, window.innerWidth, window.innerHeight);
            theAnts.forEach(ant => {
                ant.crawl();
            });
        }, mlsec);
        return crawl;
    }

    addButton.on('click', addAnts);
    colorRange.on('change', color_clicker);
    amountRanges.on('change', amountChange);
    speedRange.on('change',setSpeed);

    function addAnts(){
        for (let i = 0; i < antAmountRange[0].value; i++) {
            theAnts.push(new Ant(colorRange.val(),sizeRange.val()));
        }
    }
    function color_clicker() {
        $('#buttons').css('backgroundColor', `${colorRange.val()}AA`);
    }
    function amountChange(e) {
        $(e.target).siblings('label').find('span').text(this.value);
        if ($(e.target).is('#mount')&&this.value === '1') {
            addButton.text(addButtonText.slice(0, addButtonText.length - 1));
        } else addButton.text(addButtonText);
    }
    function setSpeed(){
        moves_per_second = this.value;
        console.log(moves_per_second);
        clearInterval(crawl);
        crawl=intervalStarter();
    }

    (function setup() {
        resizeCanvas();
        colorRange.val('#0000ff');
        color_clicker();
        crawl=intervalStarter();
    })();
})();
