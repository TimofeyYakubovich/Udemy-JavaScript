'use strict';

const box = document.querySelector('.box');

let observer = new MutationObserver(MutationRecord => { // MutationObserver – это встроенный объект, наблюдающий за DOM-элементом и запускающий колбэк в случае изменений. //
    console.log(MutationRecord);
});

observer.observe(box, {
    childList: true // true, если необходимо наблюдать за добавлением или удалением дочерних элементов (Включая текстовые узлы (text nodes)) //
}); // назначаем за каким элиментом (первый аргумент box) наблюдать наблюдателю 2 аргумент config - объект конфигурация с теми натсройками за которыми будет следить наблюдатель (обычно следить нужно не за всеми изменениями)//

observer.disconnect(); // observer перестаёт следить за объектом box

// ResizeObserver работает по такому же принципу но отслеживает изменение размеров элимента