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