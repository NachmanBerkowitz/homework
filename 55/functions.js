const Dow = (function () {
    'use strict';
    const dow = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Shabbos'];
    return {
        getNameOfDay: (int) => {
            return dow[int - 1];
        },
        getNumOfDay: (dayName) => {
            return (dow.indexOf(dayName) + 1);
        }
    };
}());

console.log(Dow.getNameOfDay(1));
console.log(Dow.getNumOfDay('Sunday'));
/**
 * An object with methods to calculate interest.
 * @type object
 */
const Interest = (function () {
    'use strict';

    /**
     *The amount of years that interest is accruing.
     *  @type integer;
     */
    let years = 0;
    let interestAmount = 0;
    let moneyIn = 0;
    let compoundingInterest = false;
    let includePrincipalInOutput = true;

    /**
     * Tests if input is null or undefined
     * @param {any} input input to test
     * @returns true if input is not null and not undefined
     */
    const testNoNullOrUndef = (input) => {
        return (input !== null) && (input !== undefined);
    };
    const testIfPositiveNumber = (input) => {
        return !isNaN(input) &&
            !testIfBoolean(input) &&
            input >= 0;
    };
    const testIfBoolean = (input) => {
        return typeof input=== 'boolean';
    };

    const interstCalcObj = {
        /**
         * @function sets the amount of years interest is accruing.
         */
        setYears: (amountOfYears) => {
            if (testNoNullOrUndef(amountOfYears)
                && testIfPositiveNumber(amountOfYears)) {
                years = amountOfYears;
            }
            return interstCalcObj;
        },
        setInterest: (amountOfInterest) => {
            if (testNoNullOrUndef(amountOfInterest)
                && testIfPositiveNumber(amountOfInterest)) {
                interestAmount = amountOfInterest;
            }
            return interstCalcObj;
        },
        setIsCompounding: (isCompounding) => {
            if (testNoNullOrUndef(isCompounding)
                && testIfBoolean(isCompounding)) {
                compoundingInterest = isCompounding;
            }
            return interstCalcObj;
        },
        setIncludePrincipal: (includePrincipal) => {
            if (testNoNullOrUndef(includePrincipal)
                && testIfBoolean(includePrincipal)) {
                includePrincipalInOutput = includePrincipal;
            }
            return interstCalcObj;
        },
        howMuchInterest: (money) => {
            if (testNoNullOrUndef(money)
                && testIfPositiveNumber(money)) {
                moneyIn = money;
            }
            return moneyIn
                * ( compoundingInterest ? Math.pow( (1 + interestAmount),years) : 1 + (years * interestAmount)) 
                    - (includePrincipalInOutput ? 0 : moneyIn);
        },
        interest: (money, amountOfYears, amountOfInterest, isCompounding,includePrincable) => {
            return interstCalcObj.setYears(amountOfYears).setInterest(amountOfInterest).setIsCompounding(isCompounding).setIncludePrincipal(includePrincable).howMuchInterest(money);
        }
    };
    return interstCalcObj;
}());

var amount = Interest.setInterest(.10).setYears(1).howMuchInterest(100);
console.log('a',amount);

amount = Interest.setYears(2).howMuchInterest();
console.log('b',amount);

amount = Interest.setIsCompounding(true)
    .setIncludePrincipal(false)
    .howMuchInterest();
console.log('c',amount);

Interest.setInterest(.20);
amount = Interest.howMuchInterest();
console.log('d',amount);

amount = Interest.setInterest(.10).setYears(10).setIsCompounding(false).setIncludePrincipal(true).howMuchInterest(200);
console.log('e',amount);

amount = Interest.interest(100,1,.1);
console.log('f',amount);

amount = Interest.interest(null,3,null,true,false);
console.log('g',amount);



