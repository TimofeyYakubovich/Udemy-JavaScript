import { useHttp } from "../../hooks/http.hook";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import store from "../../store";

import { selectAll } from "../heroesFilters/filtersSlice";
// import { heroCreated } from "../../actions";
import { heroCreated } from "../heroesList/heroesSlice";
import { useCreateHeroMutation } from "../../api_Lesson_211/apiSlice";

const HeroesAddForm = () => {

    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const [createHero, {isLoading}] = useCreateHeroMutation(); 
    // когда useCreateHeroMutation срабатывает он возвращает массив с 2 данными (сразу дисруктурируем)
    // 1 функция createHero каторая будет вызывать мутацию
    // 2 объект (сразу дисруктурируем) с данными о состоянии запроса isFetching isLoading и тд. 

    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement
        }

    // при обычном запросе useGetHeroesQuery хук возвращал данные heroes и методы и сам запрос оптравлялся самостоятельно при вызове хука
    // когда используется хук с мутацией useCreateHeroMutation нужен какой то тригер что бы эту мутацию запустить например отправка формы

        // request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
        //     .then(res => console.log(res, 'Отправка успешна'))
        //     .then(dispatch(heroCreated(newHero)))
        //     .catch(err => console.log(err));
        // теперь запрос будет делаться функцией createHero()
        createHero(newHero).unwrap(); // после createHero надо вызвать функцию unwrap что бы все переменные во 2 объекте правильно оработали

        setHeroName('');
        setHeroDescr('');
        setHeroElement('');
    }

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }

        if (filters && filters.length > 0) {
            return filters.map(({name, label}) => {
                if (name === 'all') return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}>
                    <option >Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                    {/* <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option> */}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;