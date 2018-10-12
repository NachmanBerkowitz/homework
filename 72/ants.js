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
            this.radius = size/2;
            this.color = color;
            this.head = {};
            this.body={};
            this.tail={};
            this.head.x = canvas.offsetWidth / 2;
            this.head.y = canvas.offsetHeight / 2;
            this.head.move = {
                x: 0,
                y: 0,
            };
            this.body.move={};
            this.tail.move={};
            this.fixedTurns = 0;
            this.firstDraw();
        }
        firstDraw(){
            this.setDirection();
            
            Object.assign(this.body.move,this.head.move);
            Object.assign(this.tail.move,this.body.move);
        }
        crawl() {
            this.setupNextMove();
            this.setupNextPosition();
            
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.head.x, this.head.y, this.radius, 20, 40 * Math.PI, false);
            context.stroke();
            context.arc(this.body.x, this.body.y, this.radius, 20, 40 * Math.PI, false);
            context.stroke();
            context.arc(this.tail.x, this.tail.y, this.radius, 20, 40 * Math.PI, false);
            context.stroke();
            context.fill();
        }
        setupNextMove(){
            if (--this.fixedTurns <= 0) {
                this.setDirection();
            }
            Object.assign(this.tail.move,this.body.move);
            Object.assign(this.body.move,this.head.move);
        }
        setupNextPosition(){
            let next_x = this.head.x + this.head.move.x;
            if (next_x < 0 || next_x > (canvas.offsetWidth - 1) - this.radius) {
                next_x = this.head.x + (this.head.move.x *= -1);
            }
            this.head.x = next_x;
            this.body.x += this.body.move.x;
            this.tail.x += this.tail.move.x;
            let next_y = this.head.y + this.head.move.y;
            if (next_y < 0 || next_y > canvas.offsetHeight - 1 - this.radius) {
                next_y = this.head.y + (this.head.move.y *= -1);
            }
            this.head.y = next_y;
            this.body.y += this.body.move.y;
            this.tail.y += this.tail.move.y;
        }
        getRandomAmountOfTurns() {
            return Ant.getRandomNumber(3, 50);
        }
        setDirection() {
            this.head.move.x = Ant.getRandomNumber(-5,5);
            this.head.move.y = Ant.getRandomNumber(-5,5);
            const divisor = (((Math.abs(this.head.move.x)**2)+(Math.abs(this.head.move.y)**2))/((this.radius*2)**2))**.5;
            const MoveX = (this.head.move.x/divisor)*-1;
            const MoveY = (this.head.move.y/divisor)*-1;
            this.body.x = this.head.x+MoveX;
            this.body.y = this.head.y+MoveY;
            this.tail.x = this.body.x+MoveX;
            this.tail.y = this.body.y+MoveY;
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
    antAmountRange.on('change',setText)

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
        
    }
    function setSpeed(){
        moves_per_second = this.value;
        console.log(moves_per_second);
        clearInterval(crawl);
        crawl=intervalStarter();
    }
    function setText(e){
        if ($(e.target).is('#amount')&& this.value === '1') {
            addButton[0].innerText=addButtonText.slice(0, addButtonText.length - 1);
        } else {
            addButton.text(addButtonText);
        }
    }

    (function setup() {
        resizeCanvas();
        colorRange.val('#0000ff');
        color_clicker();
        crawl=intervalStarter();
    })();
})();
