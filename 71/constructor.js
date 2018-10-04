(function(){
    'use strict';

    const VehicleProto = {
        go : function (speed='unknown'){
            this.speed=speed;
            console.log(`now going at speed ${this.speed}`);
        },
        print : function (){
            console.log(`color: ${this.color}, speed: ${this.speed}`);
        },
        constuctor: Vehicle
    };
    
    function Vehicle(color='unknown'){
        this.color = color;
        this.speed;
    }

    Vehicle.prototype = VehicleProto;

    const PlaneProto = {
        __proto__:VehicleProto,
        go : function (speed='unknown'){
            this.speed=speed;
            console.log(`now flying at speed ${this.speed}`);
        }
    };

    function Plane(color='unknown'){
        this.color = color;
        this.speed;
    }

    Plane.prototype = PlaneProto;

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

}());