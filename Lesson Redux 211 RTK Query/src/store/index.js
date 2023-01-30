// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import ReduxThunk from 'redux-thunk'
// import reducer from '../reducers';
// import heroes from '../reducers/heroes';
import heroes from '../components/heroesList/heroesSlice';
// теперь вместо импорта редьсера из файла heroes импортируем редьюсер из среза heroesSlice
// import filters from '../reducers/filters';
import filters from '../components/heroesFilters/filtersSlice';
import { apiSlice } from '../api_Lesson_211/apiSlice'; // импортируем весь объект apiSlice

const enhancer = (createStore) => (...args) => { 
    // функция enhancer принимает как аргумент createStore и возвращает новую функцию каторая тоже принимает какие то аргументы
    const store = createStore(...args);

    const oldDispatch = store.dispatch; // в переменную oldDispatch ложим оригинальный dispatch из стора
    store.dispatch = (action) => {        // изменяем обычный вызов dispatch
        if(typeof action === 'string') {  // если в dispatch придет акшен как строка
            return oldDispatch({          // то вызывается оригинальный dispatch в переменной oldDispatch и в него передается объект с полем type
                type: action
            })
        }
        return oldDispatch(action);       // если пришла не строка то просто возвращаем вызов oldDispatch с акшеном
    }
    return store;
}

const stringMiddleware = (store) => (next) => (action) => {  // последняя функция возвращает уже новый dispatch
    // сдесь как store в первой функции передается не весть стор а только dispatch и getState
    // next это dispatch пишется next потому что вместо него вызывается dispatch из следующего мидлвеера в цепочке мидлвееров
        if(typeof action === 'string') {  // если action пришел как строка 
            return next({             // то возвращаем обычный dispatch с объектом где строка записана в поле type
                type: action
            })
        }
        return next(action);      
}

const store = configureStore({
    reducer: {heroes, 
                filters,
                [apiSlice.reducerPath]: apiSlice.reducer}, // apiSlice.reducerPath свойство формируем динмачиески apiSlice.reducer передаем редьюсер
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
    // что бы RTK Query работал надо передать еще 1 мидлвеер apiSlice.middleware готовый мидлвеер для RTK Query
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;