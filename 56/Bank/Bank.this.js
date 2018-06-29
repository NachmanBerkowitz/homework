const Account1 = {
    balance:5
};
const Account2 = {
    balance:10
};
function addInterest(amountsInPercent, print){
    let x=0;
    let returnArray = [];
    amountsInPercent.forEach(amountInPercent => {
        returnArray[x]= (1+amountInPercent)*this.balance;
        x++;
    });
    if(print){
        console.log(print);
    }
    return returnArray;
}
console.log(addInterest.call(Account1,[1,2]));
console.log(addInterest.apply(Account1,[[1,2,3],{hi:'hi'}]));
const aI = addInterest.bind(Account2,[1,3]);
console.log(aI());