import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Header} from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode> // StrictMode похож по функционалу на 'use sctrict'
  // можно применить синтаксис диструктуризации {StrictMode}
  // StrictMode инструмент для обнаружения потенциальных проблем в приложении актривирует строгий режим и предуприждения для своих 
  // потомков можно использовать где угодно имопртировать в другие компаненты
  //   <App />
  // </React.StrictMode>

  <StrictMode>
      <App />
      <div>
          <Header/>
      </div>
  </StrictMode>
  
  // основная концкпция реакта это разбиение приложения на компаненты
  // компаненты это блоки пользовательского интерфейса которые могут имень собственное поведение и состоять и разного набора тегов
  // элементы это структурные частички команентов
  // компаненты это структурные блоки приложения могут переиспоьльзоваться и путишествовать по другим файлам

  // элементы неизменяемые их можно пересоздать и занаво поместить на страницу

  // <App />, // это реакт компанент компаненты всегда пишутся с большой буквы который импортируется из другова файла
  // <Header/>,
  // <App><Header/></App>
);

reportWebVitals();
