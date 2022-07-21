/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {

    // Calc
    
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;
    // let sex = 'female', 
    // height, weight, age, 
    // ratio = 1.375;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', '1.375');
    }

    function initLocalSettings(selector, activeClass) {
        const elemets = document.querySelectorAll(selector);

        elemets.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '...';
            return; // такой прием используется что бы досрочно прервать функцию
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            // Math.round округляет до ближайшего целого
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elemets = document.querySelectorAll(selector); // получаем все дивы внутри родителя parentSelector

        elemets.forEach(elem => {
            elem.addEventListener('click', (e) => { // делегируем события на все дивы
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio'); 
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                console.log(ratio, sex);
    
                elemets.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });

        // document.querySelector(parentSelector).addEventListener('click', (e) => { // делегируем события на все дивы
        //     if (e.target.getAttribute('data-ratio')) {
        //         ratio = +e.target.getAttribute('data-ratio'); 
        //     } else {
        //         sex = e.target.getAttribute('id');
        //     }

        //     console.log(ratio, sex);

        //     elemets.forEach(elem => {
        //         elem.classList.remove(activeClass);
        //     });

        //     e.target.classList.add(activeClass);

        //     calcTotal();
        // });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicformation(Selector) {
        const input = document.querySelector(Selector);

        input.addEventListener('input', () => { // Событие input срабатывает каждый раз при изменении значения.

            if (input.value.match(/\D/g)) {    // если пользователь вводит не число
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });

    }

    getDynamicformation('#height');
    getDynamicformation('#weight');
    getDynamicformation('#age');

}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {

     // Используем классы для карточек

     class MenuCard {
        constructor(src, alt, title, descr, price, perentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.perent = document.querySelector(perentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            // console.log(this.classes);
            if(this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className)); // перебираем массив classes и добовляем все классы в нем только что созданному div
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
                
            `;
            this.perent.append(element); // помещаем element внутрь perent
        }
    }

    // const div = new MenuCard();
    // div.render();

    const getResource = async (url) => { // так как get запрос объект для отправки не нужен и объект с заголовками тоже
        const res = await fetch(url);
        // если fetch столкнется с какой нибудь ошибкой в Http запросе 404 500 502 и тд. он не выдаст catch (reject)
        // ошибка для него отсутсвие интернета или какие то неполадки на сервере или в самом запросе
        // поэтому такое поведение надо вручную обработать
        // 2 свойства которые есть у промиса который возврощается из fetch
        // .ok это свойство каторое нам дословно говорит что мы что то получили и всё окей либо не окей
        // status выдаёт статус который вернул нам сервер 200 404 500 

        if (!res.ok) { // !res.ok если что то не так пошло 404 500 502 то сработает блок кода catch (reject)
            throw new Error(`Could not fetch ${url}, status: ${res.status}`); 
            // new Error() объект ошибки в него помещаем текст ошибки каторый нам необходимо выдать
            // оператор throw испиользуется что бы выкинуть ошибку (те ошибки каторые попадают в консоль)
        }

        return await res.json(); // сдесь тоже не известно сколько метод json() будет переводить возвращённый промис в обычный обект 
    };

    // getResource('http://localhost:3000/menu')
    //     .then(data => {   // сюда придёт уже обычный массив с объектами data с сервера 
    //         // data.forEach(obj => {  // перебираем массив forEach называем каждый объект в массиве obj
    //         data.forEach(({img, altimg, title, descr, price}) => { // дисктруктуризация объекта вытаскиваем все свойства объекта 
    //             // new MenuCard(obj.img, obj.altimg, obj.title, obj.descr, obj.price, '.menu .container').render(); 
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //             // конструктор MenuCard будет создаваться столько раз сколько объектов внутри массива data
    //         });
    //     });

    // ВТОРОЙ ВАРИАНТ СОЗДАНИЕ ЭЛМЕНТОВ НА СТРАНИЦЕ ДИНАМИЧЕСКИ В СЛУЧАЕ ЕСЛИ НЕ НУЖЕН НИКАКОЙ ШАБЛОН (КЛАСС) ЭЛИМЕНТ СОЗДАЁТСЯ 1 РАЗ

    // getResource('http://localhost:3000/menu')
    // .then(data => createCard(data, '.menu .container'));

    // function createCard(data, parent) { // функция будет принимать массив с объектами от сервера 
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         // перебираем массив forEach дисктруктуризация объекта вытаскиваем все свойства объекта
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
                
    //         `;

    //         document.querySelector(parent).append(element);
    //     });
    // }

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
            console.log(data);
        });

    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu .container',
    // ).render();

    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     11,
    //     '.menu .container',
    //     'menu__item',
    // ).render();

    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     17,
    //     '.menu .container',
    //     'menu__item',
    // ).render();
    

}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {

     //Modal

     const modalTrigger = document.querySelectorAll('[data-modal]'),
     modal = document.querySelector('.modal');
    //   modalCloseBtn = document.querySelector('[data-close]');

    // modalTrigger.forEach(btn => {
    //     btn.addEventListener('click', () => {
    //         // modal.style.display = 'block';
    //         // modal.classList.add('show');
    //         // modal.classList.remove('hide');
    //         // modal.classList.toggle('show');
    //         // document.body.style.overflow = 'hidden'; // запрещаем скролить страницу //
    //     });
    // });

    modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
    });

    function openModal () {
    // modal.classList.toggle('show');
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // запрещаем скролить страницу //
    clearInterval(modalTimerID); // сбрасываем setTimeout(openModal, 3000) //
    }

    // modalTrigger.addEventListener('click', () => {
    //     // modal.style.display = 'block';
    //     // modal.classList.add('show');
    //     // modal.classList.remove('hide');
    //     modal.classList.toggle('show');
    //     document.body.style.overflow = 'hidden'; // запрещаем скролить страницу //
    // });

    // modalCloseBtn.addEventListener('click', () => {
    //     // modal.style.display = 'none';
    //     // modal.classList.add('hide');
    //     // modal.classList.remove('show');
    //     modal.classList.toggle('show');
    //     document.body.style.overflow = ''; // разрешаем скролить страницу //
    // });

    // modalCloseBtn.addEventListener('click', closeModal);

    // modal.addEventListener('click', (e) => {
    //     if (e.target === modal) {
    //         modal.classList.toggle('show');
    //         document.body.style.overflow = '';
    //     }
    // });

    modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
        closeModal();
    }
    });

    function closeModal () {
    modal.classList.add('hide');
    modal.classList.remove('show');
    // modal.classList.toggle('show');
    document.body.style.overflow = '';
    }

    document.addEventListener('keydown', (e) => { // событие нажатия клавиши клавиатуры //
    if (e.code === "Escape" && modal.classList.contains('show')) { // e.code отслеживает код клавиши //
        closeModal();
    }
    });

    const modalTimerID = setTimeout(openModal, 5000);

    function showModalByScroll () {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) { 
        // window.pageYOffset сколько пользователь отлистал страницу сверху //
        // document.documentElement.clientHeight высота видимой части страници //
        // document.documentElement.scrollHeight вся высота страници //
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
    }

    window.addEventListener('scroll', showModalByScroll);// если добавить {once: true} то даже если немного прокрутить колесико мыши событие сразу удалится //
                                                        // scroll отлавливает когда пользователь скролит страницу //


}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {

    // Slider

    // const slides = document.querySelectorAll('.offer__slide'),
    //       prev = document.querySelector('.offer__slider-prev'),
    //       next = document.querySelector('.offer__slider-next'),
    //       total = document.querySelector('#total'),
    //       current = document.querySelector('#current');
    // let slideIndex = 1;

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.classList.add('hide'));
    //     slides.forEach(item => item.classList.remove('show'));
    //     // slides.forEach(item => console.log(item));
    //     slides[slideIndex - 1].classList.add('show');

    //     // slides.forEach(item => item.style.display = 'none');

    //     // slides[slideIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // function plusSlides (n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer_slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width; 
          // window.getComputedStyle() примененные стили которые идут о css берём только ширину
    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden'; // скрываем те элименты которые не влазят в область slidesWrapper

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';
    const indicators = document.createElement('ol');
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); 
        // setAttribute устанавливает атрибут какой атрибут data-slide-to и чему он равен i + 1
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot); // помещаем все точки в массив
    }

    function DeleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }
    
    next.addEventListener('click', () => {
        if (offset === DeleteNotDigits(width) * (slides.length - 1)) {
        // if (offset === +width.replace(/\D/g, '') * (slides.length - 1)) {
        // if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) { // если это последний слайд
            // в переменной width лежит строка '400px' если наччнём умножать на число получим ошибку
            // метод slice(0, width.length - 2) выводит часть строки со значения первого аргумента до значения второго аргумента
            // берем width.length длину строки в переменной и отимаем две последних буквы чтобы отрезать 'px' 
            offset = 0;
        } else {
            // offset += +width.slice(0, width.length - 2);
            // offset += +width.replace(/\D/g, '');
            offset += DeleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`; // смещаем slidesField влево на количество пикселей offset

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {  
            // offset = +width.slice(0, width.length - 2) * (slides.length - 1);
            // offset = +width.replace(/\D/g, '') * (slides.length - 1);
            offset = DeleteNotDigits(width) * (slides.length - 1);
        } else {
            // offset -= +width.slice(0, width.length - 2);
            // offset -= +width.replace(/\D/g, '');
            offset -= DeleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`; // смещаем slidesField влево на количество пикселей offset

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to'); 
            // getAttribute помещает в переменную slideTo значение атрибута data-slide-to
            slideIndex = slideTo;
            // offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            // offset = +width.replace(/\D/g, '') * (slideTo - 1);
            offset = DeleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });


}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

    function hideTabsContent () {
        tabsContent.forEach(item => {
            // item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabsContent (i = 0) {  // i = 0 параметр по умолчанию если функция вызывается без аргументов то i = 0 // 
        // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });

}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {

    // Timer

    // const deadline = '2022-05-05';
    const deadline = new Date('2078-12-17');
    const day = new Date();
    // day.setHours(day.getHours() + (day.getTimezoneOffset()/-60));
    deadline.setFullYear(day.getFullYear());
    deadline.setMonth(day.getMonth());
    deadline.setDate(day.getDate() + 1);
    // console.log(day);
    // console.log(deadline);

    function getTimeReamining (endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), // разница между дедлайном и текущем временем //
              days = Math.floor(t / (1000 * 60 * 60 * 24)), // Math.floor округляет до целого // (1000 * 60 * 60 * 24) количесвто милисекунд в сутках // получаем сколько дней осталось до дедлайна //
              hours = Math.floor((t / (1000 * 60 * 60) % 24)), // t / (1000 * 60 * 60) получаем количество часов до дедлайна // % 24 делим на количество часов в сутках и получаем остаток //
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock (selector, endtime) {
        const time = document.querySelector(selector),
              days = time.querySelector('#days'),
              hours = time.querySelector('#hours'),
              minutes = time.querySelector('#minutes'),
              seconds = time.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock (); // запускаем функцию updateClock не дожидаясь 1000 миллисекунд что бы на странице не появлялись цифры с вёрстки

        function updateClock () {
            const t = getTimeReamining(endtime); // в переменную t помещается объект из функции getTimeReamining //

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours - 3);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () => {

    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

    tabs();
    modal();
    timer();
    cards();
    calc();
    forms();
    slider();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map