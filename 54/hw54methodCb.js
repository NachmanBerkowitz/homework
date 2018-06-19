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

const arrayWithUpper = ['A','b','c'];
const arrayWithoutUpper = ['a','b','c'];

const a = 'with uppercase '+ mySome(arrayWithUpper,(isUppercase)) ;
const b = 'without uppercase '+ mySome(arrayWithoutUpper,(isUppercase)) ;

const c = 'built in \'some\' with uppercase ' + arrayWithUpper.some(isUppercase);
const d = 'built in \'some\' without uppercase ' + arrayWithoutUpper.some(isUppercase);

console.log(a+'\n', b+'\n', c+'\n', d+'\n');

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

onlyIf(arrayWithUpper,isUppercase, (i)=>console.log('onlyIf ',i));
onlyIfTwo(arrayWithUpper,isUppercase, (i)=>console.log('onlyIfTwo ',i));


 