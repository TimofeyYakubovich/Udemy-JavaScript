const log = function (a, b, ...rest) { // ...rest - рест оператор собирает в массив все аргументы после a, b которые будут переданы в функцию
    console.log(a, b, rest);
};

log('basic', 'rest', 'operator', 'usage');

function calcOrDouble(number, basis = 2) { // basis = 2 параметр по умолчанию
    // basis = basis || 2; // прием до стандарта ES6 если basis не был передан то он будет 2
    console.log(number * basis);
}

calcOrDouble(3);