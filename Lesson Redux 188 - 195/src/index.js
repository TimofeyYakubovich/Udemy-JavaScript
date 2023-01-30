import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, bindActionCreators } from 'redux';
import reducer from './reducer';
// import { inc, dec, rnd } from './actions';
import * as actions from './actions';
import { Provider } from 'react-redux';

// import Counter from './components/Counter';
import App from './components/App';

// устанавливаем 2 библиотеки redux react-redux npm i redux react-redux
// react-redux служит типа прослойкой между react и redux

// const initialState = 0; // стейт каторый будет изменяться

// // класическая функция reducer
// const reducer = (state = 0, action) => {  // функция каторая будет изменять стейт
//     // if (action.type === 'INC') {       // state = 0 на случай если первоначальный стейт не будет передан
//     //     return state + 1;
//     // }
//     // return 0;
//     switch (action.type) {
//         case 'INC':
//             return state + 1;
//         default: 
//             return state;
//     }
// }

// // console.log('Hello Redux');

// let state = reducer(initialState, {type: 'INC'}); // инициируем создание стейта, initialState начальное состояние
// state = reducer(state, {type: 'INC'});            // {type: 'INC'} это action действие каторое будет совершаться над стейтом
// state = reducer(state, {type: 'INC'});            // в этом объекте должно быть одно обязатеьное поле type строкой
// state = reducer(state, {type: 'INC'});
// console.log(state);



// подключим библиотеку Redux

// import { createStore } from 'redux';
// createStore создает Store катрый включает в себя Reducer и State

// const initialState = 0;
// const initialState = {value: 0};

// // const reducer = (state = 0, action) => { 
// const reducer = (state = initialState, action) => {
//     // reducer должна быть чистой функцией тоесть она должна зависить от стейта и экшана каторые в нее приходят
//     // должна возвращать один и тот же результат при одинаковых аргумента и не иметь никаких побочных эфектов
//     // тоесть запросов на сервер console.log и работы с дом деревом и тд.
//     // reducer должна соблюадть принципи иммутабельности тоесть тот стейт каторый приходит в нее не должен быть мутирован
//     // если это объект то сначало создаем его копию а потом уже работаем с ней
//     switch (action.type) {
//         case 'INC':
//             // return state + 1;
//             return { // так как стейт initialState это объект соблюдая принципы иммутабельности создаем новый объект {} в стейте может быть 
//                 ...state,  // много свойств поэтому разварачиваем предыдущий стейт спрет оператором ...state
//                 value: state.value + 1 // и изменяем только то свойство каторое нам надо
//             };
//         case 'DEC':
//             // return state - 1;
//             return {
//                 ...state,
//                 value: state.value - 1
//             };
//         case 'RND':
//             // return state * Math.floor(Math.random() * 10); такая запись будет ошибкой потому что в reducer не должно быть случайных чисел
//             // можно перенести вычисления рандомного числа в обработчик события
//             // return state * action.payload;
//             return {
//                 ...state,
//                 value: state.value * action.payload
//             };
//         default: 
//             return state;
//     }
// }

// let state = reducer(initialState, {type: 'INC'});

// console.log(state);

const store = createStore(reducer,    // createStore создает store катрый включает в себя Reducer и State
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); 
                                    // можно создавать несколько сторев но в реальных приложениях создется только 1 хранилеще

// const {dispatch, subscribe, getState} = store;

// что бы что то происходило когда срабатывает метод dispatch допустим UI реагировал на изминения стейта у стора есть метод subscribe

// store.subscribe(() => { // в subscribe передаем функцию каторая будет срабатывать каждый раз когда происходят изминения dispatch внутри стейта
//     console.log(store.getState());
// });

// store.dispatch({type: 'INC'}); // что бы поменять стейт в редаксе в store есть метод dispatch он берет какой то Action и передает его в reducer
// store.dispatch({type: 'INC'}); // в dispatch не нужно передвать стейт он и так знает с каким стейтом он будет работать
                               // пому что мы создали store и он уже содержит и стейт и dispatch

// console.log(store.getState()); // у store есть метод getState катрый просто получает стейт из store
// const {inc, dec, rnd} = bindActionCreators(actions, dispatch); // помещаем bindActionCreators выше upDate что бы использовать inc, dec, rnd

// const upDate = () => {
    // document.getElementById('counter').textContent = store.getState() // getState() предоставляет стейт как объект целиком
    // если стейт объект и мы его попытаемся поместить в строку то получим [object Object]
    // document.getElementById('counter').textContent = store.getState().value;
    // document.getElementById('counter').textContent = getState().value;

    // помещаем все вызовы копанентов в функцию upDate каторая вызывается в функции subscribe каторая вызывается при изменении стейта
    // так как реакт пока не понимает когда перерендеревать компанент так как стейты сейчс в редюсере
    // const root = ReactDOM.createRoot(document.getElementById('root'));
    // root.render(
    //   <React.StrictMode>
    //     {/* <App /> */}
    //     {/* <Counter
    //       counter={getState().value}
    //       inc={inc}
    //       dec={dec}
    //       rnd={() => {
    //         const value = Math.floor(Math.random() * 10);
    //         rnd(value);
    //       }}
    //     /> */}
    //     {/* <App/> */}
    //     <Provider store={store}>
    //         <App/>
    //     </Provider>  
    //     {/* если так оставить то компанент Counter в App не получит пропсы каторые должны приходить отсюда из index.js
    //         можно было бы просто прокинуть пропсы ниже по иерархии или придуамть что то с реакт контекстом 
    //         но можно использовать библиотеку react-redux каторая внутри себя уже реализует этот контекст 
    //         импортируем Provider из react-redux и помещаем главный компанент App внутрь провайдера 
    //         и для того что всё прилежине могло использовать глобальный store передаем его как пропс в Provider 
    //         теперь в любом компаненте на люблм уровне вложенностей можно обращаться к стору при помощи dispatch
            
    //         тоесть теперь в index.js не нужно импортировать actions их будем использовать на уровне Counter или App
    //         так же не понадобится сдесь деструктуризация из стора const {dispatch, subscribe, getState} = store; и 
    //         const {inc, dec, rnd} = bindActionCreators(actions, dispatch); они тоже буду вызываться на уровень ниже
            
    //         этот компанент Provider автоматически отслеживает все изменения стора 
    //         пожтому такую конструкцию можно вынести из upDate и subscribe тоже не нужен*/}
        
    //   </React.StrictMode>
    // );
    // reportWebVitals();
// }
// upDate(); // в первый раз надо вызвать upDate потому что иначе на странице ничего не будет показываться
// store.subscribe(upDate); // когда сработает subscribe он вызывает функцию upDate каторая записывает в h1 значение стейта
// subscribe(upDate);

// функция actionCreator каждый раз когда создаем какое то действие addEventListener например в ручную прописываем объект {type: 'INC'} например 
// и передаем его в dispatch это не особо удобно если действий будет много и они будут вызывать одни и те же акшены
// поэтому обычно создают отдельную функцию каторая будет возвращать этот объект
// const inc = () => {
//     return {
//         type: 'INC'
//     }
// }
// перенесем все экшенкриеторы в в файл actions.js и reducer в reducer.js
// const inc = () => ({type: 'INC'});
// const dec = () => ({type: 'DEC'});
// const rnd = (value) => ({type: 'RND', payload: value});

// если Action станет больше тогда и actionCreator станет больше и функций типа incDispatch станет больше
// можно создать еще одну функцию bindActionCreator по созданию функций типа incDispatch
// bindActionCreator уже встроена в редакс импортируем из редакса функцию bindActionCreators 
// но так приходится каждый раз повторять вызов этой функции поэтому используется встроеная в редакс функция она позволяет забиндить сразу
// несколько функций ввиде объекта

// const bindActionCreator = (creator, dispatch) => (...args) => { // функция bindActionCreator возврощает еще одну функцию каторая принимает (...args)
//     dispatch(creator(...args)); // creator это actionCreator inc, dec, rnd каторые возвращают объект 
// }

// const incDispatch = bindActionCreator(inc, dispatch);
// const decDispatch = bindActionCreator(dec, dispatch);
// const rndDispatch = bindActionCreator(rnd, dispatch);
// const incDispatch = bindActionCreators(inc, dispatch);
// const decDispatch = bindActionCreators(dec, dispatch);
// const rndDispatch = bindActionCreators(rnd, dispatch);

// const {incDispatch, decDispatch, rndDispatch} = bindActionCreators({ // один actionCreator поменяли на объект 
//     incDispatch: inc,  // как итог работы этой функции получаем объект где ключами будут те же функции просто обернутые в функцию dispatch
//     decDispatch: dec,  // так как плучаем объект сразу делаем его диструктуризацию 
//     rndDispatch: rnd
// }, dispatch);

// немного изменим импорт экшенов из actions.js импортируем сразу все как объект без диструктуризации и переименуем его в actions
// и этот объект actions можеи использовать как аргумент в bindActionCreators
// const {inc, dec, rnd} = bindActionCreators(actions, dispatch); // как итог работы функции получим объект где каждый ActionCreator обернут диспетчем
                                                               // и тут же его диструктурируем
// const incDispatch = () => dispatch(inc());
// const decDispatch = () => dispatch(dec());
// const rndDispatch = (value) => dispatch(rnd(value));

// document.getElementById('inc').addEventListener('click', () => {
//     // store.dispatch({type: 'INC'});
//     // store.dispatch(inc());  // так как store.dispatch(inc()); постоянно используется вытаскиваем dispatch из store
//     dispatch(inc());  // так как постоянно идет двойной вызов функции dispatch(inc()) создают промежуточную функцию incDispatch
// });

// document.getElementById('inc').addEventListener('click', incDispatch);
// document.getElementById('inc').addEventListener('click', inc);

// document.getElementById('dec').addEventListener('click', () => {
//     // store.dispatch({type: 'DEC'});
//     // store.dispatch(dec());
//     dispatch(dec());
// });

// document.getElementById('dec').addEventListener('click', decDispatch);
// document.getElementById('dec').addEventListener('click', dec);

// document.getElementById('rnd').addEventListener('click', () => {
//   const value = Math.floor(Math.random() * 10);
// //   store.dispatch({type: 'RND', payload: value});
// // store.dispatch(rnd(value));
//     // dispatch(rnd(value));
//     // rndDispatch(value);
//     rnd(value);
// });


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     {/* <App /> */}
//     <Counter
//       counter={getState().value}
//       inc={inc}
//       dec={dec}
//       rnd={() => {
//         const value = Math.floor(Math.random() * 10);
//         rnd(value);
//       }}
//     />
//   </React.StrictMode>
// );

// reportWebVitals();

const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>  
        {/* если так оставить то компанент Counter в App не получит пропсы каторые должны приходить отсюда из index.js
            можно было бы просто прокинуть пропсы ниже по иерархии или придуамть что то с реакт контекстом 
            но можно использовать библиотеку react-redux каторая внутри себя уже реализует этот контекст 
            импортируем Provider из react-redux и помещаем главный компанент App внутрь провайдера 
            и для того что всё прилежине могло использовать глобальный store передаем его как пропс в Provider 
            теперь в любом компаненте на люблм уровне вложенностей можно обращаться к стору при помощи dispatch
            
            тоесть теперь в index.js не нужно импортировать actions их будем использовать на уровне Counter или App
            так же не понадобится сдесь деструктуризация из стора const {dispatch, subscribe, getState} = store; и 
            const {inc, dec, rnd} = bindActionCreators(actions, dispatch); они тоже буду вызываться на уровень ниже
            
            этот компанент Provider автоматически отслеживает все изменения стора 
            пожтому такую конструкцию можно вынести из upDate и subscribe тоже не нужен
            
            в index.js остается толкьо создаение стора const store = createStore(reducer); 
            и сюда де импортируем функцию reducer что бы изменять стор*/}
        
      </React.StrictMode>
    );
    reportWebVitals();
