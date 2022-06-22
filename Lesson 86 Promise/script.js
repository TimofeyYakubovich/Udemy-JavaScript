'use strict'

console.log('Запрос данных...'); // синхронный код выполнется сразу же

const req = new Promise((resolve, reject) => { // Обещание, помещаем промис в переменную
    // обычно в промисах колбек функция принимает в себя два аргумента resolve и reject
    // resolve и reject означают функции которые мы можем сами передавать
    // resolve вызывается если (обещание) выполнилось правильно
    // reject вызывается если обещание не выполнилось (ссылка на несуществующий файл или сервер и тд.)


    setTimeout(() => {               // асинхронный код
        console.log('Подготовка данных...');
    
        const product = {
            name: 'TV',
            price: 2000
        };

        resolve(product); // в случае положительного исхода выполняется req.then() можно передвать аргумент
        // что бы использовать объект product в req.then() ретюрним в него product
    
    }, 2000);
});

req.then((product) => { // метод then() выполняется на промисе в случае положительного исхода (в промисе выполнится resolve())
    // console.log('Данные получены');
    // setTimeout(() => {
    //     product.status = 'order';
    //     console.log(product);
    // }, 2000);

    // const req2 = new Promise((resolve, reject) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            product.status = 'order';
            resolve(product); // в таком случае product передаётся на ледующий промис как (data)
            // reject();         // в случае не положительного исхода пропускает все then() и выполняется catch()
        }, 2000);
    });

    // req2.then(data => {
    //     console.log(data);
    // });
}).then(data => {
    // console.log(data);
    data.modify = true;
    return data;
}).then(data => {
    console.log(data);
}).catch(() => { // метод catch() выполняется на промисе в случае не положительного исхода (в промисе выполнится reject()) пишется всегда последним
    console.error('Произошла ошибка');
}).finally(() => { // метод finally() выполняется при любом исходе промиса
    console.log('finally');
});

const test = time => {
    return new Promise(resolve => { // иногда reject можно не использовать редко
        setTimeout(() => resolve(), time);
    });
};

// test(1000).then(() => console.log('1000 ms'));
// test(2000).then(() => console.log('2000 ms'));

Promise.all([test(1000), test(2000)]).then(() => {
    // Promise глобальный объект метод all принимает в себя массив с промисами
    // Promise.all служит для того что бы мы точно убедились что все промисы выполнились
    // Promise.all ждёт выполнения всех промисов которые переданы в массив и только потом будет что то выполнять
    console.log('All');
});

Promise.race([test(1000), test(2000)]).then(() => {
    // Promise глобальный объект метод race принимает в себя массив с промисами
    // Promise.race ждёт выполнения только одного из промисов из тех что переданы в массив и только потом будет что то выполнять
    console.log('All');
});


// Promise глобальный объект метод all принимает в себя массив с промисами


// setTimeout(() => {               // асинхронный код
//     console.log('Подготовка данных...');

//     const product = {
//         name: 'TV',
//         price: 2000
//     };

//     setTimeout(() => {
//         product.status = 'order';
//         console.log(product);
//     }, 2000);

// }, 2000);