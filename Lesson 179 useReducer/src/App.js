import {useState, useReducer} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// хук useReducer альтернатива useState

// иногда бывают компаненты со сложной логикой состояния нпртимер при клике на определенные кнопки будут покащываться слайды на 1 вперед и назад,
// на 2 вперед и назад, перый слайд и тд. тоесть много действий каторые работают с одной частью состояния
// в этом слайдере можно добавить кнопки каторые будут устанавливать разную скорость автопереключения слайдера autoplay не просто ставить 
// true или false а давать ему какое то число
// можно просто создавать дополнительные функции для изменения назначить на каждую кнопку каждая будет менять по свойму стейт 
// но таких функций можно получить давольо много
// эти функции можно объеденить в одну структуру для этого и нужен хук useReducer
// импортируем useReducer

// когда создается состояние при помощи useReducer то нам так же возвращается массив где 0 элимент это стейт 1 элимент функция через каторую 
// будет меняться этот стейт но обычно ее называют dispatch лучше ее не переименовывать если таких хуков используется несколько лучше эти функции
// называть например dispatchAutoplay и тд. так будет всем понятнее что именно делает эта функция

// сам хук принимает 3 аргуента: 1 функцию reducer, 2 начальное состояние, 3 аргумент для ленивого создания начального состояния

// 1 функция reducer твечает за модификацию состояния не вызыв изменения как это делает dispatch а именно модификацию
// принимает в себя 2 аргумента state, action

// state то состояние какторое будет меняться autoplay это текущее состояние на момент до его изминения

// action назване того действия катрое мы хотим совершить
// создадим 3 кнопки каторые будут отвечать за работу с autoplay в каждой кнопке в onClick запускаем функцию dispatch в каторую надо передать
// объект у которого главное свойство должно называться type в него будем передвать строку
// так будетт 3 кнопки первая будет тоглить остальные будут устанавливать значение либо быстро либо медленно
// action (действие) это и есть тот объект каторый мы передаем в dispatch он должен содержать одно обязательное свойство type
// этот объект action передается в функцию reducer как 2 аргкмент со строчкой type типом действия
// и уже в функции reducer в зависимости от типа действия каторое было передано будет меняться текущее состояние state
// для этого испльзуется конструкция switch case
// из него в зависимости от совпадения возвращаем объект каторый запишется в новое состояние autoplay
// поэтому как начальное состояние обычно записывают объект
// таким образом можно добовлять сколько угодно разных действий

// можно передвать и 3 аргумент лениво создает начальное значение
// это может быть полезно например в аснихронных операциях
// передаем как 3 аргумент функцию init каторая будет принимать аргумент initial и эта функцияя будет возвращать объект с тем начальным состоянием
// каторое нам нужно
// теперь вместо начального состояния передаем initial каторый приходит из пропсов компанента Slider
// теперь начальное значение будет прогоняться через фнкцию в ней что то выполняется и из нее возвращается объект с начальным состоянием

// но если надо передать какое то определенное значение в стейт на этапе dispatch
// такое может быть когда например надо установить скорость допустим из инпута когда пользователь руками вводит цифры или на конопке написана 
// цифра и ее надо установиь как стейт
// в таком случае можно расширить объект action в dispatch добавить еще одно свойтсво назвать можно как угодно но обычно называют payload
// прописать его можно вручную или брать прямо из того элимента на катором все происходит для этого понадобится объект события +e.target.textContent
// если в reducer совпадает 'custom' то возвращаем объект в катором стейту autoplay назанчаем action.payload

// функция dispatch сиабильна не изменяется при повторных рендарах

function reducer (state, action) {
    switch (action.type) { // проверяем объект action его type какое действие пришло
        case 'toggle':     // если type = 'toggle' 
            return {autoplay: !state.autoplay}; // то возвращаем объект со войством autoplay: текущий стейт это аргумент state
        case 'slow':
            return {autoplay: 300};
        case 'fest':
            return {autoplay: 700};
        case 'custom':
            return {autoplay: action.payload};
        default: // если ничего не совпало 
            throw new Error(); // выбрасыаем новую ошибку
    }
}

function init (initial) {
    return {autoplay: initial}
}

const Slider = ({initial}) => {
    const [slide, setSlide] = useState(0);
    // const [autoplay, setAutoplay] = useState(false);
    // const [autoplay, dispatch] = useReducer(reducer, false);
    // const [autoplay, dispatch] = useReducer(reducer, {autoplay: false}, init);
    const [autoplay, dispatch] = useReducer(reducer, initial, init);

    function changeSlide(i) {
        setSlide(slide => slide + i);
    }

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                {/* <div className="text-center mt-5">Active slide {slide} <br/>{autoplay ? 'auto' : null} </div> */}
                <div className="text-center mt-5">Active slide {slide} <br/>{autoplay.autoplay ? 'auto' : null} </div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    {/* <button 
                        className="btn btn-primary me-2"
                        onClick={() => setAutoplay(!autoplay)}>toggle autoplay</button> */}
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'toggle'})}>toggle autoplay</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'slow'})}>slow autoplay</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'fest'})}>fest autoplay</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={(e) => dispatch({type: 'custom', payload: +e.target.textContent})}>1000</button>
                </div>
            </div>
        </Container>
    )
}

function App() {
    return (
        <Slider initial={false}/>
    );
}

export default App;
