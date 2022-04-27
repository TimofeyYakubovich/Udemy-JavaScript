// touchstart событие срабатывает при возникновении косания к этому элементу

// touchmove событие срабатывает при каждом смещении пальца по элементу (работает пока палец находится в движении даже за пределами элемента)

// touchend событие срабатывает при отрыве пальца от элемента

// touchenter событие срабатывает при наведении пальца на элемент

// touchleave событие срабатывает при соскальзовании пальца с элемента

// touchcancel точка соприкосновения больше не регестрируется (палец вышел за пределы браузера)
console.log('script');
document.addEventListener('DOMContentLoaded', () => {
    const box = document.querySelector('.box');

    box.addEventListener('touchstart', (event) => {
        event.preventDefault(); // при назначении мобильных событий рекомендуется отменять стандартное поведение браузера //

        console.log("touchstart");
        console.log(event.touches);
        console.log(event.targetTouches);
    });

    box.addEventListener('touchmove', (event) => {
        event.preventDefault(); // при назначении мобильных событий рекомендуется отменять стандартное поведение браузера //

        // console.log("touchmove");
        console.log(event.targetTouches[0].pageX); // получение координаты х //
    });

    box.addEventListener('touchend', (event) => {
        event.preventDefault(); // при назначении мобильных событий рекомендуется отменять стандартное поведение браузера //

        console.log("touchend");
    });
    
});

// touches свойсвто выдает список всех пальцев которые щас взаимодействуют с экраном //
// targetTouches свойсвто выдает список всех пальцев которые щас взаимодействуют с этим элементом //
// chengedTouches свойсвто выдает список всех пальцев которые учавствуют в текущем событии //

// const script = document.createElement('script');  // динамическое подключение скрипта test к строницце с помощью js //
// script.src = "js/test.js";                        // динамически загружаемые скрипты видут себя как async //
// script.async = false;                             // скрипт будет загружаться как обычный со страницы //
// document.body.append(script);

function loadScript (src) {
    const script = document.createElement('script');  
    script.src = src;                        
    script.async = false;                             
    document.body.append(script);
}

loadScript("js/test.js");