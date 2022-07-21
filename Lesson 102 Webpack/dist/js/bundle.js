/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((module) => {

'use sctrict'

// допустим js файлы по 20 000 строк и их стоит разделить на более мелкие файлы 
// некаторые из них зависят друг от друга 
// что бы собрать все файлы в один скрипт существует несколько подходов
// самый популярный это система моделей CommonJS и система импотров экспортов которые появились в стандарте ES6



//  допустим нужно перенести эту функцию из файла main.js в файл index.js что бы использовать её там 

function myModule() {
    this.hello = function() {
        console.log('hello');
    };

    this.goodbye = function() {
        console.log('goodbye');
    };
}

// синтаксис CommonJS
// обращаемся к объекту module и у него есть свойство exports 
module.exports = myModule; // экспортируем функцию, на щас нужно где то ее импортировать (переходи в файл index.js)

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
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
// импортируем кусок кода из main.js с помощью функции require в нее передаём путь к файлу откуда импортируем без приписки js
const myModule = __webpack_require__(/*! ./main */ "./src/js/main.js");

const myModuleInstans = new myModule;

myModuleInstans.hello();
myModuleInstans.goodbye();

// брвузер не умеет ссобираь модули самостоятельно он просто выдаст ошибку потому что не знает чо за функция require
// для сборки модулей будем использовать сборщик Webpack

//сначало как обычно нужно установить Webpack себе в npm проект

// mkdir webpack-demo создаем папку командой mkdir
// cd webpack-demo переходим в эту папку
// npm init -y  инициализируем первый npm проект
// npm install webpack webpack-cli --save-dev  устанавливаем непосредственно webpack
// webpack это сам webpack
// webpack-cli это то что позволяет запускать webpack с командной строки

// если мы используем стандартные настройки webpack то фаил indox.js куда мы всё импортируем должен лежать в папке src

// запускаем webpack npx webpack 
// в папке dist появляется фаил main.js

// в реальных проектах используется конфигурационный файл для гибкой настройки сборок

// 
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map