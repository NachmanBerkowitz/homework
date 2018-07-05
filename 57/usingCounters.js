for( let i = 0; i < 10; i++){
    app.counter.increment();
}
console.log('A pushete counter:',app.counter.getCount());

const counter1 = app.counterGetter.getCounter();
const counter2 = app.counterGetter.getCounter();

for( let i = 0; i < 5; i++){
    counter1.increment();
}
console.log('Counter 1:',counter1.getCount());

for( let i = 0; i < 15; i++){
    counter2.increment();
}
console.log('Counter 2:',counter2.getCount());