'use strict';

let path = require('path'); // техническая переменная которая нужна для правильной работы РУКАМИ НЕ ТРОГАЕМ!

module.exports = {
  mode: 'development', // режим в катором работает webpack два режима development и production 
  entry: './src/js/script.js', // путь к фаилу в котором прописаны все зависимоти require или импорт из нового стандарта, если таких файлов несколько создаётся объект
  output: {   // конфигурация того файла который получится в итоге 
    filename: 'bundle.js',  // его название 
    path: __dirname + '/dist/js' // путь где он будет лежать  __dirname - корень папки
  },
  watch: true, // если watch: true то webpack будет следить и автоматически собирать все файлы когда мы измених и сохраним их можно настроить

  devtool: "source-map", // хранить исходники

  module: {} // модули и их настройка
};