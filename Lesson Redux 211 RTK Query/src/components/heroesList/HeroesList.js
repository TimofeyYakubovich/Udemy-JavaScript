import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroDeleted, fetchHeroes, filteredHeroesSelector } from './heroesSlice';
import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api_Lesson_211/apiSlice'; // импортируем хук по получению героев
// хук useGetHeroesQuery генерирует давольно большое количество различных свойств для использования 
// когда создавали собвственый хук useHttp из него экспортировали и гдето использовали различные сущности response и тд.
// с useGetHeroesQuery тоже самое запускается хук получаем объект и из него уже выатскиваем то что надо

// когда делается запрос на сервер при поиощи RTK Query данные кешируются тоесть запоминаются на несколько минут если с ними ничего не делать
// это позволяет оптимизмровать количество запросов при повторных рендерах крмпанента 

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {

    const {
        data: heroes = [], // те даные каторые приходят от сервера записываются data
        // data: heroes = [] значение поумолчанию если данные еще не пришли что бы не было ошибки при передаче героев в renderHeroesList
        isFetching,  // isFetching становится true когда делаются последующие запросы
        isLoading, // isLoading говорит что мы впервый раз оброщаемся к серверу для получения данных true или false
        isSuccess, // isSuccess становится true когда уже загрузились данные с успехом
        isError,   // isError становится true когда происходит ошибка при общении с сервером
        error   // сама ошибка
        // isUninitialized, // isUninitialized становится true когда запрос еще не был оотправлен
        // refetch // функция каторая позволяет вручную запустить запрос

    } = useGetHeroesQuery(); // запускается просто в теле компанента запрос уходит без прочих хуков useEffect и тд.
    // запрос будет выполняться после маунтинга компанента 

    // RTK Query заменяет целую кучу функционала но в приложении есть параметры катоыре завист от действий пользователя например выбраный
    // вручную фильтр это действие существует только на фронтенде на клиенте никак не зависит от сервера

    const [deleteHero] = useDeleteHeroMutation(); // 2 объект не вытаскиваем он нам не нужен

    const activeFilter = useSelector(state => state.filters.activeFilter); // вытаскиваем из стейта activeFilter

    const filteredHeroes = useMemo(() => { // оборачиваем в useMemo что бы каждом перерендере копанента не проводилась фильтрация
        const filteredHeroes = heroes.slice();  // делаем копию heroes что бы не мутировать данные от сервера 

        if (activeFilter === 'all') {
            return filteredHeroes;  // филтруем героев и хаписываем в переменную filteredHeroes
        } else {
            return filteredHeroes.filter(item => item.element === activeFilter);
        }
}, [heroes, activeFilter]);

    // const filteredHeroes = useSelector(filteredHeroesSelector);

    // const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    // heroesLoadingStatus уже не нужен хук возвращает isLoading isFetching isSuccess
    // const dispatch = useDispatch();
    // const {request} = useHttp();

    // useEffect(() => {
    //     dispatch(fetchHeroes());
    //     // eslint-disable-next-line
    // }, []);

    const onDelete = useCallback((id) => {
        // request(`http://localhost:3001/heroes/${id}`, "DELETE")
        //     .then(data => console.log(data, 'Deleted'))
        //     .then(dispatch(heroDeleted(id)))
        //     .catch(err => console.log(err));
        // теперьь запрос удаления будет делаться функцией heroDeleted()
        deleteHero(id).unwrap();
            // eslint-disable-next-line
    // }, [request]);
    }, []);

    // if (heroesLoadingStatus === "loading") {
    if (isLoading) {
        return <Spinner/>;
    // } else if (heroesLoadingStatus === "error") {
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)}/>
        })
    }

    // const elements = renderHeroesList(filteredHeroes);
    // const elements = renderHeroesList(heroes); // heroes то что отдает RTK Query
    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;