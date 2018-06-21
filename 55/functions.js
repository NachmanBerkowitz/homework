const Dow = (function(){
    'use strict';
    const dow = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Shabbos'];
    return{
        getNameOfDay:(int)=>{
            return dow[int-1];
        },
        getNumOfDay:(dayName)=>{
            return (dow.indexOf(dayName)+1);
        }
    };
}());

console.log(Dow.getNameOfDay(1));
console.log(Dow.getNumOfDay('Sunday'));

const Interest = (function(){
    'use strict';
    let years = 0;
    let interestAmount = 0;
    const interstCalcObj ={
        howMuchInterest:(money)=>{
            return money*interestAmount*years;
        },
        setYears:(amountOfYears)=>{
            years=amountOfYears;
            return interstCalcObj;
        },
        setInterest:(amountOfInterest)=>{
            interestAmount=amountOfInterest;
            return interstCalcObj;
        }
    };
    return interstCalcObj;
}());

var amount = Interest.setInterest(.5).setYears(1).howMuchInterest(100);
console.log(amount);
amount = Interest.setYears(2).howMuchInterest(100);
console.log(amount);
Interest.setInterest(.25);
amount = Interest.howMuchInterest(100);
console.log(amount);



