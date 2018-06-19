function mySome(array,methodIsAny){
    for(let i = 0; i < array.length; i++){
        if(methodIsAny(array[i])){
            return true;
        }
    }
    return false;
}

const isUppercase = (char)=>{
    return char >= 'A' && char <='Z';
};

const isLowercase = (char)=>{
    return char >= 'a' && char <='z';
};

const arrayMixCase = ['A','b','c'];
const arrayAllLower = ['a','b','c'];
const arrayAllUpper = ['A','B','C'];


const a = 'is upper with uppercase '+ mySome(arrayMixCase,(isUppercase)) ;
const b = 'is lower with lowercase '+ mySome(arrayMixCase,(isLowercase)) ;
const c = 'is upper without uppercase '+ mySome(arrayAllLower,(isUppercase)) ;
const d = 'is lower without lowercase '+ mySome(arrayAllUpper,(isLowercase)) ;

const e = 'built in \'some\' with uppercase ' + arrayMixCase.some(isUppercase);
const f = 'built in \'some\' without uppercase ' + arrayAllLower.some(isUppercase);

console.log(a+'\n', b+'\n', c+'\n', d+'\n', e+'\n', f+'\n');

//////////////////

function onlyIf(array, test, action){
    for( let i = 0; i < array.length; i++){
        if(test(array[i])){
            action(array[i]);
        }
    }
}

function onlyIfTwo(array, test, action){
    array.filter(test).forEach(action);
}

onlyIf(arrayMixCase,isUppercase, (i)=>console.log('onlyIf ',i));
onlyIfTwo(arrayMixCase,isUppercase, (i)=>console.log('onlyIfTwo ',i));


 