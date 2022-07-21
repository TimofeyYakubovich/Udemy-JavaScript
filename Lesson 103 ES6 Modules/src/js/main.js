'use sctrict'
// модульная структура стандарта ES6 более гибкая
// для того что бы что то экспортровать используем ключевое слово export
// главное передовать в export имя того что мы экспортируем

export let one = 1;

let two = 2;

export {two};

// export function sayHi() {
//     console.log('Hello');
// }

// Так же есть экспорт по умолчанию
// экспорт по умолчанию экспорт по умолчанию доджен быть только один!!!
export default function sayHi() {
    console.log('Hello');
}
