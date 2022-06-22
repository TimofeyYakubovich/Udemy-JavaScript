'use strict'

// filter фильтрует элименты массива 

const names = ['Ivan', 'Ann', 'Ksenia', 'Voldemart'];

const shortNames = names.filter(function(name) {
    return name.length < 5; // возврощаея из колбек функции только те элименты которые подходят под условие
}); // метод filter() перебирает элименты массива и возврощает только те элименты которые подходят под устолве
    // name каждый отделный элимент массива

console.log(shortNames);

// map берет исходный массив и изменяет каждый элмент внутри его на выходе получается новый массив

const answers = ['IvAn', 'AnnA', 'Hello'];

const result = answers.map(item => item.toLowerCase()); // метод toLowerCase() переводит в нижний регистр
                           // item каждый элимент массива
//     return item.toLowerCase();
// });

console.log(result);

// every/some
// every метод перебирает массив и если все элименты подходит под условию то метод позворощает true
// some метод перебирает массив и если хотя бы один элимент подходит под условию то метод позворощает true 

const some = [4, 'qwq', 'fsfsgssg'];

console.log(some.some(item => typeof(item) === 'number')); // если не раскрываем фигурные скобки то return подставляется автоматически
// item каждый элимент массива typeof() выдаёт тип данных
console.log(some.every(item => typeof(item) === 'number'));

// reduce перебирает массив схлопывать или собирать массив в одно единое целое

const arr = [4, 5, 1, 3, 2, 6];
                    //   0      4
                    //   4      5
                    //   9      1
                    //   10     2
                    //   13     2
                    //   15     6
                    //   21
const res = arr.reduce((sum, current) => sum + current, 3); // получаем сумму всех элиментов выполнять можно любые действия
// можно использовать и со строками
// sum сумма всех элиментов на каждом цикле перебора массива
// current это элимент который перебирается на этом цикле
// метод reduce может принимать 3 аргумент который будет первоночальным значением sum
console.log(res);

const arr1 = ['apple', 'pear', 'plum'];
// const res1 = arr1.reduce((sum, current) => sum + ', ' + current);
const res1 = arr1.reduce((sum, current) => `${sum}, ${current}`);
console.log(arr1);
console.log(res1);

// нужно вытащить имена людей persone

const obj = {
    ivan: 'persone',
    ann: 'persone',
    dog: 'animal',
    cat: 'animal'
};
// ченинг записываем цепочку методов
const newArr = Object.entries(obj) // Object.entries(obj) создаёт из объекта массив массивов матрицу 
.filter(item => item[1] === 'persone') // перебираем все массивы в массиве и оставлям только те у которых 2 элимент 'persone'
.map(item => item[0]);    // получаем массив из исходного массива только с первыми элиментами

console.log(newArr);