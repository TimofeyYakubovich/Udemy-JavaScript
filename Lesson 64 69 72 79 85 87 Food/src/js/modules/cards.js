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