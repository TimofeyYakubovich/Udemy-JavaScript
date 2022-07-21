import React from 'react'; // импорт библиотеки React с папки node_modules импортируем класс
// ее не нужно импортировать в каждый отдельный файлик
import ReactDOM from 'react-dom/client'; // импорт второй библиотеки ReactDOM
// React отвечает за работу с JSX со всеми внутренними возможностями реакта
// ReactDOM позволяет работать с DOM структурой на странице она позволяет нам вставлять библиотеку React на страницу  
import './index.css'; // обычный импорт стилей
import App from './App'; // импортируем App.js в нем функция App 
import reportWebVitals from './reportWebVitals'; // импорт старонней библиотеки WebVitals она измеррят как быстро рабоает наше рпиложение

// в файле index.html в див <div id="root"></div> рендерится всё приложение

const root = ReactDOM.createRoot(document.getElementById('root'));
// сдесь мы используем библиотеку ReactDOM каторая вытаскивается из клиентской части 'react-dom/client'
// получам div с id="root" со страницы document.getElementById('root')
// и создаем корневой узел приложения при помощи команды createRoot
// помещаем его в переменную root

// const el = <h1>Hello World!</h1>
// console.log(el);

// создадим рекат элемент
// const elem = <h2>Hello World!</h2>; // мы создали html тег и поместили его в переменную elem тоесть сразу смешали js и html разметку
// в этом и есь оснавная прелесть JSX 

// const elem = React.createElement('h2', null, 'Hello World');
// React может использоваться и без JSX стандартным js
// используем React как класс и у него есть метод createElement принимает 3 аргумента: название тега, классы если классов нет то null и содержимое 
// в таком варианте babel использоваться не будет
// const elem = React.createElement('h2', {className: 'greetings'}, 'Hello World'); // такой синтаксис редко используется
// на самом деле нам вернётся такой объект и уже он будет использоваться что бы создать h2 на странице
// const elem = {
//   type: 'h2', // тип элимента
//   props: {    // свойства элимента
//     className: 'greetings',
//     children: 'Hello World'
//   }
// };

const text = 'Hello World';

const elem = ( 
    <div>
        если елимент имеет многострочную структуру то его нужно обарачивать в ()
        в многострочном элементе всегда должен быть один родитель
        <h2>Hello World</h2>
        <input type="text" />
        <button>Click</button>
        <button/> можно и так
        <h2 className="text">Текст: {text}</h2>
        <h2 className="text">Текст: {2+2}</h2>
        при момощи фигурных скобок можно вставлять любые выражения в верстку переменные, текст, математические операции,
        вызовы фенкций, методы объектов и тд.
        {/* <h2 className="text">Текст: {new Date()}</h2> нельзя помещать объект из соображений безопастности объект превратится в строку*/}
        <h2 className="text">Текст: {['3423412']}</h2>
        <h2 className="text">Текст: {['3423412', '235623562', '3562356']}</h2>
        {/* массивы скливаются в строку */}
        в реакт элиментах можно использовать все доступные атрибуты как в обычном html но с 2 особенностями
        1 атрибуты всегда пишутся в формате CamelCase пишутся слитно без пробелов
        <button tabIndex={0}>Click</button>
        2 есть специальные атрибуты которые не совподают с бычными в html className и htmlFor
        class и For уже зарезервированы в javaScript
        <h2 className="text">Текст: {text}</h2>
        <label htmlFor=""></label>
    </div>
);

root.render( // render отрисовывает рендерит какую то структуру в корневом узле ДОЛЖНА ВЫЗЫВАТЬСЯ ТОЛЬКО ОДИН РАЗ
// НА САМОМ ВЕРХНЕМ УРОВНЕ ПРИЛОЖЕНИЯ все осталное рпиложение собирается по отдельным файлам 
// при помощи библиотеки ReactDOM мы вставляем root.render прилжение в верстку index.html document.getElementById('root')
// это и есть всё наше приложение
  // <React.StrictMode> 
  //   <App />
  // </React.StrictMode>
  elem, // Отображаем элемент elem на странице приложения
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// разработка Web-приложения обычно сложней чем разрабтка сайта

// Web-приложение работает как обычная программа но уже в браузере например figma
// манипуляции DOM деревом удаление создание измененние элиментов долгий и трудозатратный процесс 
// в больших Web-приложениях это важно учитывать для этого нужны алгоритмы оптимизации всего этого процеса 
// можно написать их самомоу но существует уже готовый инструмент который включает в себя все механизмы оптимизации

// для разработки сложных интерфейсоф нужны продвинутые технологии тот же React
// он позвляет работать быстрее избегать багов и ошибок и делать продукт более оптимизированнный 

// React это JavaScript-библиотека с открытым исходным кодом для разработки пользовательских интерфейсов.
// React разрабатывается и поддерживается Facebook, Instagram и сообществом отдельных разработчиков и корпораций.

// сама концепция реакта заключается в том что с его помощью можно создавать одностраничные приложения 
// или SPA (Single Page Application) которые более отзывчивы и ведут себя как обычные программы на компьютере
// они взаимодействуют с пользователем и реагируют на его действия изминением внешнего вида тоесть User Interface
// это и есть главная задача Web-приложений изменять страницу без перезагрузки по требованию и контралироваь использование памети браузером

// библиотека React декларативная
// императивное и декларативное программирование
// Императивное программирование — это как именно дойти к результату конкретные шаги
// декларативное программирование — это сразу какой результат нам нужен


// React основан на компанентах 
// любой сайт например github или mail.ru сдесь есть много одинаковых компанетов но с разным содержимым и так на болшенстве сайтов
// React построен на модульной структуре тоесть на UI компанентах (User interface элементы) именно из таких повторяющихся блоков
// с разным контентом строится приложение
// эти компаненты должны быть компактны и независимы как функции их можно повтрно использовать при создании приложения 
// компаненты должны никак не зависить от другова кода и могут быть легко изменены или удалены
// повоторяющиеся компаненты беспечивают чистоту глобального пространства (избегать конфликтных ситуаций с одинаковыми именами)
// все данные компанента существуют в собственной области видимости и их можно переносить из проекта в проект каждый раз немного изменяя

// React позволяет создавать нативные приложения на мобильных устройствах и многое другое библиотек на основе реакта много

// 1 React использует JSX-препроцессор это такая помись html и javaScript тоесть какие то классы каторые есть в javaScript и 
// какая то верстка каторая возвращается изнутри этих классов таким образом можно создавать разметку и прописывать логику прямо в одном месте
// в реакте можно без проблем писать на нативном javaScript

// 2 внутри Реакта есть алгоритм который позволяет отслеживать какие части приложения изменились и обновоить только их а не все приложение
// Reconciliation алгоритм 

// 3 (virtual) DOM (VDOM) стандартное DOM дерево давольно грамоздская структура каторая изночально вообще не была предназначена 
// для динамической работы разработчики не думали что веб пойдёт на столько далеко
// на примере инстаграма можно и на нативном javaScript можно реализовать подгрузку новых и новых постов когда скролим ленту 
// но при этом пришлось бы создавать тысячи новых блоков и отрисовывать их на странице это заняло бы много времени для браузера
// эту проблему решает virtual DOM это легкая копия DOM дерева
// пример заголовок первого порядка h1 в нативном DOM дереве внутри брвузера как объект содержит в себе множество 
// объектов и объектов внутри объектов 
// заголовок первого порядка h1 созданный из реакта очень простой содержит намного меньше свойств
// именно по этому приложения созданые на реакте работают намного быстрей


// React устроен по принципу разных модулей каждый кусочек интерфейса пропписан в отдельных файлах и всех их нужно
// экспортировать импортировать и собрать всё в одно большое приложение

// чо бы собрать готовую сборку со всеми нужными пакетатми создан специальный инструмент Create React App (CRA)
// Create React App - это готовя сборка каторая в одну команду создаёт готовое и настроеное приложение
// Можно настрить свою сборку как с вебпеком но это много гемороя

// создаётся командой npx create-react-app my-app
// переходим в папку с готовым приложением cd my-app (cd - change directory)
// запускаем приложение  npm start

// в папке src

// index.js и App.js самые главные файлы которые есть в сборке как при сборке проекта вебпеком куда все ипортируется
// компанент <App /> наше приложение
// import './index.css'; сюда импортируются стили
// import App from './App'; файл App.js содержит всю базовую разметку которую мы видим когда запускаем приложение
// App.css стили самой базовой версии
// setupTests.js файл для тестрования
// reportWebVitals.js файл для дополнительных функций
// logo.svg логотип который импортируется прямо в приложение 

// папка public обычно содержит статичные файлы которые не буду меняться

// index.html самый базовый index.html с которого запускается приложение
             // в файле index.html
             // тег <noscript> если в браузере выключен js то выдаст сообщение You need to enable JavaScript to run this app.
             // в див <div id="root"></div> рендерится всё приложение

             // это просто html файл для шаблона если просто открыть его в браузере то ничего не произойдёт

// node_modules папка с npm пакетами


//  package.json

//   "scripts": {  // команды 
//   "start": "react-scripts start",
//   "build": "react-scripts build",
//   "test": "react-scripts test",
//   "eject": "react-scripts eject"
// },

// "eslintConfig": {    готовый иструмент внутри сборки который подсвечивает ошибки вместо jshint но более продвинутая
//   "extends": [
//     "react-app",
//     "react-app/jest"
//   ]
// },

// "browserslist": {
//   "production": [  // для готовой версии
//     ">0.2%",
//     "not dead",
//     "not op_mini all"
//   ],
//   "development": [    // для разработки 
//     "last 1 chrome version",
//     "last 1 firefox version",
//     "last 1 safari version"
//   ]
// }
// }


// запускаем приложение npm start

// если в App.js удалить ссылку то она пропадёт и в браузере страница перезагружается автоматически

// оснавными частями этой сборки является вебпек и babel
// вебпек понятно собирает весь проект и следит за изменениями в файлах и обнавляет сраницу
// babel работает над поддержкой всех браузеров и может выступать в роли компилятора тоесть переводит JSX-препроцессор в js код