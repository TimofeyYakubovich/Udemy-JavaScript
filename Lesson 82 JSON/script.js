'use strict';

// JSON JavaScript Object Notation Текстовый формат обмена данными
// испльзуется для передачи и хранения файлов
// JSON это набор пар ключ значение как в объекте все стрки должны быть в ""

const persone = {
    name: 'Alex',
    tel: '+7444444444'
};

console.log(JSON.stringify(persone)); // используем метод stringify() объекта JSON встроенного в браузер
// stringify() переводит объект в формат(JSON) данных который можно отправить на сервер {"name":"Alex","tel":"+7444444444"}

console.log(JSON.parse(JSON.stringify(persone))); // метод parse переводит прихедший с сервера JSON обратно в объект { name: 'Alex', tel: '+7444444444' }

const persone1 = {
    name: 'Alex',
    tel: '+7444444444',
    parents: {
        mom: 'Olga',
        dad: 'Mike'
    }
};

const clone = JSON.parse(JSON.stringify(persone1)); // глубокое клонирование объектов
clone.parents.mom = 'Ann';
console.log(persone1);
console.log(clone);

