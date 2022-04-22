const btn = document.querySelector('button');
      overlay = document.querySelector('.overlay');
      btns = document.querySelectorAll('button');

// btn.onclick = function () {   // onclick свойсвто DOM дерева //
//     alert('click');
// };

// btn.onclick = function () {   
//     alert('Second click');    // Second click заменяет click //
// };

// btn.addEventListener('click', () => { // addEventListener добовляем обрабтчик событий//
//     alert('click');                   // 1 аргумент 'click' названия события//
// });                                   // 2 аргумент колбек функция которя и будет обработчиком//

// btn.addEventListener('click', () => {  // addEventListener не заменяет друг друга//
//     alert('Second click');                   
// });  

// btn.addEventListener('mouseenter', () => {  // mouseenter мышка перемещена на элемент, к которому подключён обработчик//
//     console.log('Hover');                   
// });

// btn.addEventListener('mouseenter', (event) => {  // event объект-события (назвать можно как угодно) всегда передаётся 1 аргументом в колбек функцию//
//     console.log(event);
//     console.log(event.type); // названия события которое сейчас произошло//
//     console.log(event.target);  // элимент над которым это призошло // 
//     event.target.remove();         
// });

// let i = 0;

// const deleteElement =  (event) => {    
//     console.log(event.type); 
//     console.log(event.target);
//     i++
//     if (i ==1) {
//         btn.removeEventListener('click', deleteElement);
//     }
// };

// btn.addEventListener('click', deleteElement);
// btn.removeEventListener('click', deleteElement);  // removeEventListener удаляет обрабтчик событий//




const deleteElement =  (event) => {  
    console.log(event.target);
    console.log(event.currentTarget); // currentTarget - событие click срабатывает на элименте родителе overlay//
    console.log(event.type); 
};

btn.addEventListener('click', deleteElement);  // сначала срабатывает событие на элементе btn а после по иерархии ввеох на элементе overlay//
overlay.addEventListener('click', deleteElement);

const link = document.querySelector('a');

link.addEventListener('click', function(event) {
    event.preventDefault();  // preventDefault() отменяет стандартное поведение браузера тоесть не переходит на ютуб//

    console.log(event.target);
});

// btns.forEach(item => {  // назначаем оброботчик события сразу всем кнопкам в псевдомассиве btns //
//     item.addEventListener('click', deleteElement);
// });

btns.forEach(item => {  
    item.addEventListener('click', deleteElement, {once: true}); // 3 аргумент в обработчике события это ОБЪЕКТ опции //
});                                                              // опция once удаляет обработчик события после одного использования//
                                                                 // альтернатива removeEventListener//