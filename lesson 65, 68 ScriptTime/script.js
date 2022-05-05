// const timeId = setTimeout(function(text) { // setTimeout вызывает функцию (1 аргумент) через определеннный промежуток времени (2 аргумент) //
//     alert(text);                           // (3 аргумент 'Hello') передаётся в function как аргумент "используется не часто" аргументов может быть много //
// }, 2000, 'Hello');

const timeId = setTimeout(logger, 2000); // числовой идентификатор //
// setTimeout(logger, 2000);

clearInterval(timeId); // clearInterval сбрасывает setTimeout //

function logger () {
    // alert('text');
    console.log('Hello');
}


//________________________________________________________//


// const btn = document.querySelector('.btn');
// let timeID1,
//     i = 0;

// btn.addEventListener('click', () => {
//     timeID1 = setInterval(logger1, 500); // если logger1 выполняется больше чем 500 милисекунда setInterval не будет после выполнения ждать еще //
// });                                      // 500 милисекунд а сразу начнёт выполнять logger1 //

// // clearInterval(timeID1);

// function logger1 () {
//     if (i === 3) {
//         clearInterval(timeID1);
//     }
//     console.log('Hello');
//     i++;
//     console.log(i);
    
// }

// let id = setTimeout(function log () { // рекурсивный метод setTimeout будет четка ждать выполнение функции log и 500 милисекунд после //
//     console.log('hELLO');
//     id = setTimeout(log, 500);
// });

const btn = document.querySelector('.btn');
let timeID1,
    i = 0;

function myAnimation () {
    const elem = document.querySelector('.box');
    let pos = 0;

    const id = setInterval(frame, 5);
    function frame() {
        if (pos === 300) {
            clearInterval(id);
        } else {
            pos++;
            // pos += 2;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
        }
    }
}

btn.addEventListener('click', myAnimation);


// const now = new Date();  // объект даты текущая дата и время //
// const now = new Date('2022-01-21');

const now = new Date(2022, 05, 1, 20); // плучаем 2022-06-01T17:00:00.000Z  // 06 потому что месяцы в Date считаются с 0 тоесть 0 - январь //
                                       // 17 потому что часовой пояс Минск +3 тоесть по гринвичу будет 17 //
console.log(now);

const now1 = new Date(0); // получаем 1970-01-01T00:00:00.000Z  // даты в Date хронятся в милисекуднах отсчёт начинается с 1970 года //
const now2 = new Date(-9999999999999);  // получаем 1653-02-10T06:13:20.001Z  //
console.log(now1);
console.log(now2);

const now3 = new Date();

// console.log(now3.setHours(18, 50)); // setHours(18) устанавливает час (в консоль получаем 15 потому что консоль ориентируется на UTC время)  //
// console.log(now3);                  // можно устанавливать и минуты и тд.  //

console.log(now3.setHours(40)); // если установить 40 часов он выдаёт следующий день  //
console.log(now3);

// console.log(now3.getFullYear()); // getFullYear() выдаёт только год  //
// console.log(now3.getMonth()); // getMonth() выдаёт только месяц получаем 0 потому что сейчас январь //
// console.log(now3.getDate()); // getDate() выдаёт только число месяца получаем 21 дни месяца исчесляются от 1 до 31 //
// console.log(now3.getHours());  // getHours() выдаёт только часы указанной даты по местному времени //
// console.log(now3.getUTCHours());
// console.log(now3.getMinutes()); // getMinutes() выдаёт только минуты указанной даты по местному времени //
// console.log(now3.getSeconds()); // getSeconds() выдаёт только секунды указанной даты по местному времени //
// console.log(now3.getMilliseconds()); // getMilliseconds() выдаёт только милисекунды указанной даты по местному времени //

// console.log(now3.getDay()); // getDay() номер дня недели воскресенье нуливой день субота 6 день //

// // у всех этих методов есть аналоговые методы с приставкой UTC тоесть +0 в у нас по минску +3 //

// console.log(now3.getTimezoneOffset()); // getTimezoneOffset() выдаёт разнице между местным часовым поясом и UTC //
// console.log(now3.getTime()); // getTime() количество милисекунд которое прошло с 1970 года //

// const now4 = new Date('2022-01-22');

// new Date.parse('2022-01-22'); // new Date.parse('2022-01-22') тоже самое что и new Date('2022-01-22') //

let start = new Date();

for (let i = 0; i < 100000000; i++) {
    let some = i + 3; // ** возведение в степень //
}

let end = new Date();

// alert(`цикл отработал за ${(end - start)/1000} милисекунд`);
alert(`цикл отработал за ${(end - start)/1000} секунд`);


let end1 = new Date();
console.log(end1);
console.log(end1.getTimezoneOffset());
// end1.setHours(end1.getHours() + 1);
end1.setHours(end1.getHours() + (end1.getTimezoneOffset()/-60));
let end2 = 24 - end1.getHours();
console.log(end1);
console.log(end2);



