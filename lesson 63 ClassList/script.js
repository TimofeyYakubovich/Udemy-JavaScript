const btns = document.querySelectorAll('button');
      wrapper = document.querySelector('.btn-block');

// console.log(btns[0].classList.length); // количество классов у элимента //

// console.log(btns[0].classList.item(0)); // item(0) позволяет получить класс под определённым индексом //

// console.log(btns[0].classList.add('red', 'feggsgdg')); // add('red') добовляет класс 'red' //

// console.log(btns[0].classList.remove('blue')); // remove('blue') удаляет класс 'blue' //

// console.log(btns[0].classList.toggle('blue')); // toggle('blue') - если класс 'blue' есть на элименте он его удаляет если класса нет он его добовляет //

// // if (btns[0].classList.contains('red')) { // contains проверяет наличие класса на элименте ели класс есть он возврощает true если нет то false //
// //     console.log('red');
// // }

btns[0].addEventListener('click', () => {
    // if (!btns[1].classList.contains('red')) {
    //     btns[1].classList.add('red');
    // } else {
    //     btns[1].classList.remove('red');
    // }

    btns[1].classList.toggle('red');
});

// console.log(btns[0].className); // className выдаёт список классов как одну строку УСТАРЕВШИЙ КОД! //

wrapper.addEventListener('click', (event) => {  // делегирование событий обработчик события назначеный рдителю назначается и его потомкам //
    // console.dir(event.target);               // которые поддерживают это событие //
    // console.log(event.target.tagName);
    // if (event.target && event.target.tagName == 'BUTTON') { // проверяем существование event.target потомучто не все элементы поддерживают событие клика //
    //     console.log('Hello');
    // }

    if (event.target && event.target.matches('button.red')) {  // matches это поиск совподения с тем что написано в matches //
        console.log('Hello');
    }

    if (event.target && event.target.classList.contains('blue')) { // проверяем существование event.target потомучто не все элементы поддерживают событие клика //
        console.log('Hello blue');
    }
});

// btns.forEach(btn => {  // если добовлять оброботчики события через forEach то на после добавленные элименты обработчик уже не добавится /
//     btn.addEventListener('click', () => {
//         console.log('Hello');
//     });
// });

const btn = document.createElement('button');
btn.classList.add('red');
wrapper.append(btn);