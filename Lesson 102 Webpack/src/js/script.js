// импортируем кусок кода из main.js с помощью функции require в нее передаём путь к файлу откуда импортируем без приписки js
const myModule = require('./main');

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