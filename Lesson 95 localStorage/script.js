'use strict';

// localStorage это объект который встроен в браузер для хранения данных свойство глобального объекта window
// служит для хранения данных на сайте без работы с сервером и базой данных
// вся информация останется даже если перезагрузим страницу или закроем браузер
// localStorage уникален для каждого домена для безопастности 
// localStorage в браузере состоит из двух полей Key и Value как в обычном объекте
// используется для сохранения настроек сайта, данных формы, запомнить время просмотра видео и тд.
// не резиновый помещается около 5 мб инфы

// всего 4 команды

localStorage.setItem('number', 5); // setItem() записывет новый setItem(ключ, значение)
localStorage.setItem('number', 6);
// если такой ключ уже есть то значение просто перезапишится

localStorage.removeItem('number'); // удаляет ключ
// localStorage.clear(); // удаляет все ключи

console.log(localStorage.getItem('number')); // getItem получает данные из localStorage по значению ключа





const checkbox = document.querySelector('#checkbox'),
      form = document.querySelector('form'),
      change = document.querySelector('#color');

if (localStorage.getItem('isChecked')) {// если localStorage.getItem('isChecked') true то условие выполнится 
    // если его нет в localStorage или он false то не выполнится
    checkbox.checked = true; // checkbox.checked установлена или снята галочка
}

if (localStorage.getItem('bg') === 'changed') {
    form.style.backgroundColor = 'red';
}

checkbox.addEventListener('change', () => { // 'change' событие изменения состояния чекбокса
    localStorage.setItem('isChecked', true);
});

change.addEventListener('click', () => {
    if (localStorage.getItem('bg') === 'changed') {
        localStorage.removeItem('bg');
        form.style.backgroundColor = '#fff';
    } else {
        localStorage.setItem('bg', 'changed');
        form.style.backgroundColor = 'red';
    }
});

// В localStorage можно записывать свои объекты и массивы

const persone = {
    name: 'Alex',
    age: 25
};

const serializedPersone = JSON.stringify(persone); // переводи объект persone в формат JSON
localStorage.setItem('alex', serializedPersone); // помещаем объект serializedPersone в localStorage

console.log(JSON.parse(localStorage.getItem('alex'))); // выдаём в консоль переведенный в обычный объект serializedPersone

// если помещать объект в localStorage не переводя в JSON он поместится туда как текстовое представление объекта [object Object] как строка