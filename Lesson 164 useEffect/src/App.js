import {Component, useState, useEffect} from 'react';
// импортируем хук useState
import {Container} from 'react-bootstrap';
import './App.css';
// class Slider extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             autoplay: false,
//             slide: 0
//         }
//     }

//     componentDidMount() {
//         document.title = `Slide: ${this.state.slide}`;
//     }

//     componentDidUpdate() {
//         document.title = `Slide: ${this.state.slide}`;
//     }

//     // повторение кода в таком случаем можно объедить в один метод с помощьью обычных хуков в функциональном компаненте

//     changeSlide = (i) => {
//         this.setState(({slide}) => ({
//             slide: slide + i
//         }))
//     }

//     toggleAutoplay = () => {
//         this.setState(({autoplay}) => ({
//             autoplay: !autoplay
//         }))
//     }

//     render() {
//         return (
//             <Container>
//                 <div className="slider w-50 m-auto">
//                     <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
//                     <div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
//                     <div className="buttons mt-3">
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(-1)}>-1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(1)}>+1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={this.toggleAutoplay}>toggle autoplay</button>
//                     </div>
//                 </div>
//             </Container>
//         )
//     }
// }

const Slider = (props) => {

    // хук useEffect хук работы с эфектами
    // вообще эфектами и побочными действиями называются операции по загрузке данных, использованию каких то сторонних модулей,
    // запуск таймаутов, логирование или измение дом структуры

    // есть хуки жизненного цикла и есть просто хуки
    // useState useEffect и тд. это просто хуки

    // операция по тоипу запросов на сервер, таймаутов и тд. не должно быть в конструкторе класса и в методе рендер тоже
    // теперь можно правильно сказать что в них не должно быть эффектов

    // импортируем хук useEffect

    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    useEffect(() => { 
    // хук useEffect принимает в себя колбек ффункцию каторая будет вызываться когда этот компанент отрендерился и когда обновился
    // при каждом изменении состояния slide вызывается функция внутри useEffect изменяется дом структура
    // тоесть useEffect объеденяет сразу 2 хука жизнненого цикла componentDidMount и componentDidUpdate
    // в useEffect вызываются все эффекты запросы на сервер, таймауты и тд.
    // как эта функция отслеживает внутренние переменные
    // принцип хуков построен на джаваскрипт замыканиях, эти переменные остаются в области видимости это ведь обычные функции
    // поэтому useEffect может отслеживать текущие состояние

    // эта функция внутри useEffect меняется при каждом рендере тоесть создаётся каждый раз новая функция
    // простыми словами когда компанент появляется на странице созадётся эта функция внутри useEffect и она вызывается первый раз 
    // потому что это аналог componentDidMount дальше например изменился стейт идет перерендеринг компанента так как функциональный
    // компанент все операции весь код идут заново и соответственно созадется новая функция внутри useEffect делается это для того 
    // что бы не было багов с замыканиями что бы получать актуальную переменную из стейта
        console.log('effect');
        document.title = `Slide: ${slide}`;
    }, []);

    function logging() {
        console.log('log');
    }

    useEffect(() => {
        console.log('use effect');
        document.title = `Slide: ${slide}`;

        window.addEventListener('click', logging); // когда будет вызываться useEffect навешиваем на window обработчик события
        // когда компанент Slider будет удален со страници необходимо убрать этот обработчик события если этого не сделать то 
        // Slider не будет удален из памяти
        // что бы выполнить аналог componentWillUnmount() надо из useEffect вернуть return функцию

        return () => {
            window.removeEventListener('click', logging);
            // как только компанент будет удален удалится и обработчик события
            // тоесть useEffect объеденяет сразу 2 хука жизнненого цикла componentDidMount componentDidUpdate и componentWillUnmount
        }

    }, [slide]);

    useEffect(() => {
        console.log('autoplay');
    }, [autoplay]);

    // можно для каждого стейта создавать свой эфект

    // в таком случае effect выдает в консоль при каждом нажатии любой кнопки обновлении стейта
    // но это не всегда нужно нам нужно вызывать этй функцию только при изменении slide
    // что бы эта функцию не вызывалась тогда когда не изменилось состояние slide за которым она следит 
    // в классовых компанентах в componentDidUpdate прописывается сравнение нового стейта с предыдущим
    // в хуках useEffect для этого принимает в себя 2 аргумент массив зависимостей, если ниодна из этих зависимостей не изменлась
    // то useEffect будет пропущен
    // [slide] useEffect следит за стейтом slide если он поменялся то функция внутри useEffect будет вызвана если не поменялся не будет
    // но в таком случае первый раз она всеравно будет вызвана
    // если оставить пустой массив то это будет поведение componentDidMount функция внутри useEffect будет вызвана только при первом рендеренге
    // такой функционал можно комбинировать можно создавать много хуков useEffect

    // эффекты каторые идут как подписка
    // таймпауты каторые запускаются в классовом компаненте необходимо останавливать вручную при удалении компанента со страници он не удаляется
    // такие операции как таймауты, обработчики событий, соединение между некаторыми сервисами и тд.
    // все подписки необходимо удалять при удалении компанента в классовых компанентах это делается в componentWillUnmount()
    // в useEffect тоже есть такое поведение реализуется оно возвращением колбек функции из него

    function changeSlide(i) {
        setSlide(slide => slide + i); 
    }

    function toggleAutoplay() {
        setAutoplay(autoplay => !autoplay);
    }

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                {/* <div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div> */}
                <div className="text-center mt-5">Active slide {slide} <br/> {autoplay ? 'auto' : null}</div>
                {/* теперь не надо обращаться к состоянию через this.state */}
                {/* <div className="text-center mt-5">Active slide {state.slide} <br/> {state.autoplay ? 'auto' : null}</div> */}
                {/* state.slide и state.autoplay если использовать стейт в качестве одной переменной как в клссовых компанентах */}
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                        {/* теперь ненадо обращаться к методам через this.state */}
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}


function App() {
    const [slider, setSlider] = useState(true);


    return (
        <>  
            <button onClick={() => setSlider(false)}>Click</button>
            {slider ? <Slider/> : null}
            {/* <Slider/> */}
        </>
    );
}

export default App;
