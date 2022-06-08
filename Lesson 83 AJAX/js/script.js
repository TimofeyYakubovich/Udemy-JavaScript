'use strict'

const inputRub = document.querySelector('#rub'),
      inputUsd = document.querySelector('#usd');
      
      
// inputRub.addEventListener('change') // событие change срабатывает когда input выходит из фокуса

inputRub.addEventListener('input', () => {
    // делаем запрос на сервер с помощью встроенного объекта в браузер XMLHttpRequest()
    const request = new XMLHttpRequest(); // создаём экземпляр объекта XMLHttpRequest()

    // request.open(method, url, async, login, pass); // open() метод объекта XMLHttpRequest() собирает настройки для запроса на сервер (принимает в себя аргументы)
    // method Http методы GET или POST (GET запрос получает какието данные от сервера POST отправлят данные на сервер) Get работает на простых серверах типа Live Sever POST работает на локадьных серверах типа OpenServer
    // url путь к серверу по каторому делается запрос формируется от index.html
    // 3 аргумент отвечает за асинхронность (синхронный код выполняется попорядку, асинхронный запускает отдельные интервалы кода которые могут выполняться паралельно) AJAX запросы поумолчанию выполняются асинхронно
    // login, pass некоторые запросы можно делать имея логин и пароль

    request.open('GET', 'js/current.json'); // остальные 3 аргумента необязательны

    // http заголовки описывают что отправляется на сервер
    // сдесь используется 1 setRequestHeader заголовок который нужен для передачи непосредственно json файлов

    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    // 1 аргумент тип контента Content-type
    // 2 аргумент application/json тип для json файла charset=utf-8 - стандартная кодировка

    request.send(); // метод send() отправляет запрос
    // метод send() отличается в зависимости от запроса при GET запросе метод send() не принимает никаких аргументов потому что мы ничего не отправляем на сревер. При POST запросе метод send() принимает аргумент body send(body) body это те данные которые уходят на сервер

    // свойства XMLHttpRequest() объекта
    // status статус запроса
    // statusText текстовое опесание ответа от сервера
    // response ответ от сервера который мы используем на клиенте
    // readyState текущее состояние запроса от 0 до 4

    request.addEventListener('load', () => { //  событие readystatechange отсеживает стаус гоовности запроса в данный момент используется редко событие, событие load срабатывает только один раз когда запрос полностью готов
        // if (request.readyState === 4 && request.status === 200) {
        if (request.status === 200) {
            // console.log(request.response); // получаем объект из файла json
            const data = JSON.parse(request.response);
            inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2);
        } else {
            inputUsd.value = "Что то пошло не так";
        }
    });
});