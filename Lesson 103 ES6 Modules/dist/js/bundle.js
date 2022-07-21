/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ sayHi),
/* harmony export */   "one": () => (/* binding */ one),
/* harmony export */   "two": () => (/* binding */ two)
/* harmony export */ });
'use sctrict'
// модульная структура стандарта ES6 более гибкая
// для того что бы что то экспортровать используем ключевое слово export
// главное передовать в export имя того что мы экспортируем

let one = 1;

let two = 2;



// export function sayHi() {
//     console.log('Hello');
// }

// Так же есть экспорт по умолчанию
// экспорт по умолчанию экспорт по умолчанию доджен быть только один!!!
function sayHi() {
    console.log('Hello');
}


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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ "./src/js/main.js");
// что бы ипопртировать что то из другого файла ключевое слово import после слова from прописываем путь откуда импортируем



console.log(`${_main_js__WEBPACK_IMPORTED_MODULE_0__.one} and ${_main_js__WEBPACK_IMPORTED_MODULE_0__.two}`); // после сборки получаем 1 and 2

// и всёравно все эти файлы нужно собирать каким то сборщиком модулей (webpack)

// import {one as first} from './main'; 
// // когда мы что то импортируем мы можем сразуже переименовать прямо в объявлении используется когда импортируется большое название
// console.log(first);

// так же можно импортировать всё сразу одним объектом
// и обращаться к переменным или функциям через объект

// import * as data from './main'; 

// console.log(`${data.one} and ${data.two}`); // после сборки получаем 1 and 2
// data.sayHi(); // после сборки получаем Hello

// Так же есть импорт по умолчанию


// import {default as sayHi} from './main'; // можно и так
(0,_main_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // после сборки получаем Hello


// так же можно использовать атрибут type="module" к тегу script что бы он пытался отдельно использовать скрипты в качестве модулей
// ПОЛЬЗУЮТСЯ РЕДКО
// для этого должны быть настроены как обычно экспорты импорты
// и правильно подключить на страницу html
// первым должен идти main.js потому что из него идут экспорты а после уже script.js
// это не значит что браузер сможет собрать всё это в один фаил
// он будет последоватьльно подключать эти файлы используя экспорты импорты
// после слова from прописываем путь откуда импортируем с припиской .js
// когда мы подключаем скрипты черз type="module" они работают точно также как и с атрибутом defer

// Атрибут defer указывает браузеру, что скрипт должен быть выполнен после того, как HTML-документ будет полностью разобран.
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map