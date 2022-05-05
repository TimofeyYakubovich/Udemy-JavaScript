document.addEventListener('DOMContentLoaded', () => { 

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item');
          tabsContent = document.querySelectorAll('.tabcontent');
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

    // Timer

    // const deadline = '2022-05-05';
    const deadline = new Date('2078-12-17');
    const day = new Date();
    // day.setHours(day.getHours() + (day.getTimezoneOffset()/-60));
    deadline.setFullYear(day.getFullYear());
    deadline.setMonth(day.getMonth());
    deadline.setDate(day.getDate() + 1);
    console.log(day);
    console.log(deadline);

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

    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

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
        modal.classList.toggle('show');
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

    modalCloseBtn.addEventListener('click', closeModal);

    // modal.addEventListener('click', (e) => {
    //     if (e.target === modal) {
    //         modal.classList.toggle('show');
    //         document.body.style.overflow = '';
    //     }
    // });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal () {
        modal.classList.toggle('show');
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
            this.perent.append(element);
        }
    }

    // const div = new MenuCard();
    // div.render();

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        11,
        '.menu .container',
        'menu__item',
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        17,
        '.menu .container',
        'menu__item',
    ).render();

});



