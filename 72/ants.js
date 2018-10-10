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
    class Ant {
        constructor(color) {
            this.height = 10;
            this.width =10;
            this.x = canvas.offsetWidth / 2;
            this.y = canvas.offsetHeight / 2;
            this.color = color;
            this.moveAmount = 1;
            this.fixed = {
                x:true,
                y:false
            };
            this.direction = 0;
            this.fixedTurns=0;
        }
        crawl() {
            if(--this.fixedTurns<=0){
                this.setDirection();
            }
            if(this.direction !== 0){
                this.movementX();
                this.movementY();
            }else{
                if(this.fixedTurns>20){
                    this.fixedTurns = 10;
                }
            }
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
        movementX() {
            let next_x;
            if (this.fixed['x']) {
                next_x = this.x + this.direction;
            } else {
                next_x = this.x + this.getRandomDirection();
            }
            if (next_x < 0 || next_x > (canvas.offsetWidth-1)-this.width) {
                if (this.fixed['x']){
                    next_x = this.x +(this.direction *= -1);
                }else{
                    next_x *= -1;
                }
            }
            this.x = next_x;
        }
        movementY() {
            let next_y;
            if (this.fixed['y']) {
                next_y = this.y + this.direction;
            } else {
                next_y = this.y + this.getRandomDirection();
            }
            if (next_y < 0 || next_y > (canvas.offsetHeight-1)-this.height) {
                if (this.fixed['y']){
                    next_y = this.y +(this.direction *= -1);
                }else{
                    next_y *= -1;
                }
            }
            this.y = next_y;
        }

        getRandomDirection(){
            return Ant.getRandomNumber(-this.moveAmount,this.moveAmount);
        }
        getRandomAmountOfTurns(){
            return Ant.getRandomNumber(1,300);
        }
        getRandomPlane(){
            const planes = [
                'x',
                'y'
            ];
            return planes[Ant.getRandomNumber(0,1)];
        } 
        setDirection(){
            const fixedPlane = this.getRandomPlane();
            const unfixedPlane = fixedPlane=== 'x' ? 'y' :'x';
            this.fixed[fixedPlane]=true;
            this.fixed[unfixedPlane]=false;
            this.fixedTurns = this.getRandomAmountOfTurns();
            this.direction = this.getRandomDirection();
            console.log({fixedPlane},{unfixedPlane},this.fixedTurns,this.direction);
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
