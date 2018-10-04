(function() {
    'use strict';
    class Vehicle {
        constructor(color) {
            this.color = color;
            this.speed;
        }
        go(speed = 'unknown') {
            this.speed = speed;
            console.log(`now going at speed ${this.speed}`);
        }
        print() {
            console.log(`color: ${this.color}, speed: ${this.speed}`);
        }
    }

    class Plane extends Vehicle{
        go(speed = 'unknown') {
            this.speed = speed;
            console.log(`now flying at speed ${this.speed}`);
        }
    }

    const car = new Vehicle('black');
    car.go(5);
    car.print();
    const van = new Vehicle();
    van.go();
    van.print();

    const plane =new Plane('white');
    plane.go(300);
    plane.print();
    const jet =new Plane();
    jet.go();
    jet.print();
})();
