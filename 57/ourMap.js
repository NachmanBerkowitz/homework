function ourMap(inArray, theFunction){
    const returnArray = [];
    for( let i = 0; i < inArray.length; i++){
        console.log(inArray[i]);
        returnArray[i] = theFunction(inArray[i]);
    }
    returnArray.forEach(element => {
        console.log(element);
    });
    return returnArray;
}
const testArray = [1,2,3,4,5];
function double(num){return num*2;}

ourMap(testArray,double);