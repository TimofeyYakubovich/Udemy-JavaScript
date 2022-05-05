'use strict';

const box = document.querySelector('.box'),
      btn = document.querySelector('button');

// const width = box.clientWidth; // равняется ширине элемента в пикселях, включая padding, но исключая ширину рамки (border), внешние отступы (margin), и вертикальную полосу прокрутки (если она есть). //
// const height = box.clientHeight; // равно внутренней высоте элемента в пикселах, включая padding, но исключая высоту полосы горизонтальной прокрутки, и margin. //

// console.log(width, height);

// const width = box.offsetWidth; // полная ширина элемента (включает собственно ширину элемента, ширину границ, padding, полосы прокрутки) без margin  //
// const height = box.offsetHeight; // полная высота элемента без margin //

// console.log(width, height);

const width = box.scrollWidth; //  Свойство scrollWidth содержит ширину элемента с учетом горизонтальной прокрутки. Если у элемента нет горизонтальной прокрутки, то scrollWidth равно clientWidth. //
const height = box.scrollHeight; // scrollHeight содержит высоту элемента с учетом вертикальной прокрутки. Если у элемента нет вертикальной полосы прокрутки, то значение scrollHeight равно clientHeight.  //

console.log(width, height);

btn.addEventListener('click', () => {
    box.style.height = box.scrollHeight + 'px';
    console.log(box.scrollTop); // scrollTop считывает или устанавливает количество пикселей, прокрученных от верха элемента. scrollTop измеряет дистанцию от верха элемента до верхней точки видимого контента. Когда контент элемента не создаёт вертикальную прокрутку, его scrollTop равно 0. //
});

console.log(box.getBoundingClientRect()); // getBoundingClientRect выдаёт объект с { x: 591.5, y: 50, width: 400, height: 350, top: 50, right: 991.5, bottom: 400, left: 591.5 } top и bottom расчитываются от верхней границы видимой части страницы left и right расчитываются от левой границы видимой части страницы //
console.log(box.getBoundingClientRect().top); // можно обращаться к отдельным свойствам //

const style = window.getComputedStyle(box); // qetComputedStyle выдаёт объект с Computed стилями это стили которые уже применены к элементу //

// box.style.display = 'none';

console.log(style);
console.log(style.display);

console.log(document.documentElement.clientWidth); // вся ширина документа (тега html) //

// box.style.height = box.scrollHeight + 'px';
// window.scrollTo(0, 400); // scrollTo скролит страницу от верхнего полжения принимает x и y //
// window.scrollBy(0, 400);    // scrollBy скролит страницу от текущего полжения принимает x и y //

// console.log(document.documentElement.scrollTop);



