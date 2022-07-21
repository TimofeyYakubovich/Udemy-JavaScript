function forms() {

     // Forms

     const forms = document.querySelectorAll('form');

     const message = {
         loading: 'img/form/spinner.svg',
         success: 'Спасибо! Скоро мы с вами свяжемся',
         failure: 'Что-то пошло не так...'
     }
 
     forms.forEach(item => {
         baindPostData(item);
     });
 
     // операторы Async/Await всегда используются в паре
     // async значит что внутри функции будет какой то асинхронный код
     // await ставится перед теми опрециями именно которых необходимо дождаться (по стандарту 30 с.)
     const postData = async (url, data) => {
         const res = await fetch(url, {  // в переменную res мы помещаем промис который возврощается от fetch()
             // await код будет ждать результата запроса от сервера которую поместит в переменную
             method: 'POST',
                 headers: { // если отправлять формат json
                     'Content-type': 'application/json'
                 },
                 body: data
         });
 
         return await res.json(); // сдесь тоже не известно сколько метод json() будет переводить возвращённый промис в обычный обект 
     };
 
     function baindPostData (form) {
         form.addEventListener('submit', (e) => {
             // событие submit срабатывает когда мы пытаемся отправить форму нажатием Enter или кнопки с type="submit 
             e.preventDefault(); // отменяем стандартное поведение браузера
 
             const statusMessage = document.createElement('img');
             // statusMessage.classList.add('status');
             statusMessage.src = message.loading;
             // statusMessage.style.cssText = `
             //     display: block;
             //     magrin: 0 auto;
             // `;
             statusMessage.classList.add('spinner');
             // form.append(statusMessage);
             form.insertAdjacentElement('afterend', statusMessage);
             // insertAdjacentElement('') вставляет элимент на сраницу принимает 2 аргумента
             // afterend вставляем не в саму форму а после после формы
             // какой элимент вставляем
 
             // const request = new XMLHttpRequest();
             // request.open('POST', 'server.php');
             // request.setRequestHeader('Content-type', 'multipart/form-data'); // заголовок для FormData
             // !!!!когда используется FormData и объект XMLHttpRequest() заголовок прописывать не нужно
 
             // если сервер должен принимать файлы в формате json то заголовок уже нужен
             // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
 
             const formData = new FormData(form); 
             
             // const object = {};
             // formData.forEach(function(value, key) {
             //     object[key] = value;
             // });
 
             const json = JSON.stringify(Object.fromEntries(formData.entries())); // переводим объект formData в формат JSON
 
             // const obj = {a: 23, b: 50};
             // console.log(Object.entries(obj)); // [ [ 'a', 23 ], [ 'b', 50 ] ]
             // // метод Object.entries(obj) возврощает массив собственных перечисляемых свойств указанного объекта
             // console.log(Object.fromEntries(Object.entries(obj))); // { a: 23, b: 50 }
             // // Object.fromEntries() возвращает из матрици массивов обычный объект
 
             // fetch('server.php', {
             //     method: 'POST',
             //     // headers: { // если отправлять формат json
             //     //     'Content-type': 'application/json'
             //     // },
             //     body: formData
             // })
             // postData('http://localhost:3000/requests', JSON.stringify(object))
             // .then(data => data.text()) // переводим ответ от сервера в нормальный формат
             postData('http://localhost:3000/requests', json)
             .then(data => {
                 console.log(data); // data то что вернул сервер
                 showThanksModal(message.success);
                 statusMessage.remove();
             }).catch(() => {
                 showThanksModal(message.failure);
             }).finally(() => {
                 form.reset();
             });
             // FormData() это объект который собирает данные с формы для отправки на сервер в формате ключ - значение
             // Важно что бы в инпутах формы был указан атрибут name иначе FormData не может найти этот инпут и взять с него value
 
             // FormData нельзя перегнать одним методом в формат json
             // передаём все данные с FormData в объект object
             // const object = {};
             // formData.forEach(function(value, key) {
             //     object[key] = value;
             // });
 
             // const json = JSON.stringify(object); // переводим обычный объект в формат JSON
 
             // request.send(formData); // так как POST в метод send передаём аргумент body = formData
             // request.send(json);
 
             // request.addEventListener('load', () => {
             //     if (request.status === 200) {
             //         console.log(request.response);
             //         showThanksModal(message.success);
             //         // statusMessage.textContent = message.success;
             //         form.reset(); // очищаем форму
             //         // setTimeout(() => {
             //         //     statusMessage.remove(); // удаляем сообщение
             //         // }, 2000);
             //         statusMessage.remove();
             //     } else {
             //         // statusMessage.textContent = message.failure;
             //         showThanksModal(message.failure);
             //     }
             // });
         });
     }
 
     function showThanksModal(message) {
         const prevModalDialog = document.querySelector('.modal__dialog');
 
         prevModalDialog.classList.add('hide');
         openModal();
 
         const thanksModal = document.createElement('div');
         thanksModal.classList.add('modal__dialog');
         thanksModal.innerHTML = `
         <div class="modal__content">
             <div class="modal__close" data-close="">×</div>
             <div class="modal__title">${message}</div>
         </div>
         `;
 
         document.querySelector('.modal').append(thanksModal);
         setTimeout(() => {
             thanksModal.remove();
             prevModalDialog.classList.add('show');
             prevModalDialog.classList.remove('hide');
             closeModal();
         }, 4000);
     }
 
     // API Application Programming Interface — «программный интерфейс приложения» готовые методы и свойства
     // набор данных и возможностей которое предостовляет нам какое то готове решение
     // DOM API - различные методы которые позволяют нам работать на странице
     // Fetch API // технология встроенная в браузер которая позволяет общаться с сервером построена на промисах
 
     // fetch()
     // можно было бы создать в проекте файл json куда отправлять запросы
     // jsonplaceholder небольшая база данных в формате json к которой можно обращаться для тестирования своего приложения
 
     fetch('https://jsonplaceholder.typicode.com/todos/1') 
     // глобальный метод fetch() который принимает в себя url на который посылается запрос 
     // если бльше ничего не указывать то это будет GET запрос
     // метод fetch() промис который обрабатывается при помощи цепочки then
         .then(response => response.json())
         // поолучаем ответ response в формате json, для трансформации в обычный объект обычно используется команда JSON.parse
         // у fetch есть свой метод json() для перевода формата json в обычный объект
         // response.json() возврощает нам промис с обычным объектом который можно использовать например в консоле
         .then(json => console.log(json));
     
     // для других запросов
 
     fetch('https://jsonplaceholder.typicode.com/posts', {
         method: "POST",                         // запрос
         body: JSON.stringify({name: 'Alex'}),   // то что будем отправлять stringify() переводит объект в формат(JSON)
         headers: {                              // заголовки в множественном числе
             'Content-type': 'application/json'
         }
     })
     .then(response => response.json())
     .then(json => console.log(json));
 
 
 
     //_______________________________________________________
 
     // Lesson 89
 
     // в самом начале курса мы установили окружение Node.js
     // оно позволяет работать не только с бекэндом написаном на Node.js
     // но и использовать пакетный мененджер npm
     // npm пакеты это кусочки кода которые лежат на отдельныых серверах и которые мы можем устанавливать себе в проект
     // npm пакеты наприер Gulp browsersync и тд.
     // Обычно в реальны проектах будет установлено много различных пакетов npm
     // прежде чем устанавливать npm пакеты мы должны нашей системе сказать что этот проект будет содержать npm пакеты 
     // тоесть он будет npm проектом, сделать это нужно что бы наша система чётко знала какет пакте содержит проект какая версия и тд.
     // что бы создать npm проект прописываем в терминале npm init отвечаем на вопросы нажимаем y и всё
     // в проекте появляется файлик package.json с данными из терминала и инофрмацию о пакетах каторые мы установим
     // дальше уже можно устанавливать любые npm пакеты в проект
     // устанавливаем JSON-server npm i json-server можно установить глобально и локально
     // глобально npm i json-server -g занчит он будет работать в любой части нашей сиситемы в любом проекте без установки будет работать 
     // будем устанавливать локально npm i json-server именно в этот проект конкретную версию так каждый пользователь будет знать
     // каке пакеты ему надо установить 
     // дальше нужно указать флаг который указывает как этот пакет влияет на наш проет
     // используется он только при разработке либо при работе проекта 
     // у нас JSON-server будет использоваться толко при разрабтке чтобы тестировать на функционал
     // если пакет используется только при разработке прописываем npm i json-server --save-dev = зависимость для разработки
     // если пакеты используются для работы проекта внутри например библиотеки Jquery React прописываем --save
     // устанавливаем локально npm i json-server --save-dev в package.json появилась зависимость devDependencies это пакеты 
     // каторые установлены только для разработки. Пактеы которые будут установлены для работы проекта появятся в поле Dependencies
     // Папка node_modules это непосредственно все пакеты которые установлены в проект НИКОГДА РУКАМИ НЕ ТРОГАЕМ должна быть прописана в gitignore
     // если другой разработчик скачает с гита этот проект там не будет папки node_modules ему просто надо будет прописать в терминале
     // npm i и все пакеты с package.json у него установятся автоматически в папку node_modules
     // package-lock.json прописаны различные пакеты зависимости пути и тд. ТОЖЕ РУКАМИ НЕ ТРОГАЕМ
 
     // json-server это простой сервер для работы с json файлами когда мы их используем как маленькую базу данных
     // в нем работает метод POST. Пока что с настоящим бекендом не можем работать но сэмулируем его таким способом
     // что бы запустить прописываем в терминале npx json-server db.json с путем к той базе данных которую мы хотим запустить на сервере
     // получаем Resources несколько путей куда мы можем делаь запросы http://localhost:3000/menu   http://localhost:3000/requests
 
     fetch('db.json')                     // обрашаемся к db.json GET запрос, возращается нам промис
         .then(data => data.json())       // переводим пришедший к нам объект data в формате json в обычный объект javaScript
         .then(res => console.log(res));  // res результат который получается перешедший в этот промис
 
 
 
     fetch('http://localhost:3000/menu')  // обрашаемся к db.json через json-server                    
         .then(data1 => data1.json())
         .then(res1 => console.log(res1));  // получаем только один массив из базы даных db.json 
 
 

}

module.exports = forms;