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