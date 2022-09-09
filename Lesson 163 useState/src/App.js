import {Component, useState} from 'react';
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

// сдесь есть точно такой же компанент как и выше классовый только функциональный без логики
// на данном этапе без хуков можно сказать что реализовать такой же функционал нельзя
// сделаем при помощи хуков компаненты индентичными по функционалу
// введем сосояние в функциональный компанент
// хук это функция каторая позволяет активировать некаторые возможности реакта каторые были до этого только в классах
// впервую очередь импортируем хук каторый называется useState


// оптимизационный вопрос по вычислениею ачального стейта
// допустим начальное состояние будет вычисляться в вункции calcValue каторая потом будет передаввть в useState
// const calcValue = () => {
//     console.log('random');

//     return Math.random() * (50 - 1) + 1;
// }

const Slider = (props) => {

    // нужно запустить эту функцию useState так что бы она создала состояние внутри функционального компанента
    // сдесь нужно понимать когда мы создаем что то внутри функциональных компанентов то значение буду записываться в переменные
    // внутри этой функции так как это обычная функция просто она заканчивается return тем что возврощает кусок верстки

    // состоянеи каторое в клссовых компанентах харнилось в кострукторе переменной стейт (свойства класса) в функциональном
    // компаненте храниться в обычных переменных

    // const slideStateArray = useState(); // вызываем функцию каторая когда запускается возвращает нам массив из двух элиментов
                                        // 1 элимент это наш стейт, 2 элимент это функция каторая будет менять это состояние
    // console.log(slideStateArray[0]); // на понятно что получая так массив его не очень удобно использовать придётся через индекс
                                        // 0 - что бы обратиться к стейту, 1 - что бы к функции
    const [slide, setSlide] = useState(0);// поэтому используется сокращенный синтаксис деструктуризации массивов
                                        // тот массив каторый возвращается из useState() разбиваем на 2 переменные
                                        // 1 переменная тот стейт 2 переменная функция каторая меняет это состояние
                                        // что бы установить начальное значение стейта передаётся как аргумент в useState()
                                        // если ничего не передать то будет undefined, помещать можно что угодно
                                        // можно создавать множество переменных состояния
    const [autoplay, setAutoplay] = useState(false);

    // const [slide, setSlide] = useState(calcValue); 
    // в таком случае в кансол выдает random 1 раз но при нажатии на кнопки random не выдает
    // const [slide, setSlide] = useState(calcValue());
    // если в useState передать calcValue() именно вызыв функции то при каждом изменении стейта будет вызываться эта функция
    // если эта функция calcValue тяжелая то она будет есть ресурсы браузера это плохо
    // const [slide, setSlide] = useState(() => calcValue());
    // можно передать колбек фнкцию если нужны какие то аргументы так функция не будет вызываться каждый раз, только дин раз в начале

    // что бы изменять состояние динамически создаем функцию
    function changeSlide(i) {
        // в классовом компаненте для изменения состояния используется this.setState 
        // но в функциональном есть уже подвязанная функция к состоянию setSlide

        // setSlide(5); // так запишется в slide 5
        setSlide(slide => slide + i); // фнукция setSlide соблюдает все принципы иммутабельности
        // так как стейт зависит от предыдущего стейта передаем колбек функцию каторая принимает аргумент slide текущее состояние

        // если сотавить вот так то по нажатию на кнопку slide будет увеличивать на только на 1 хотя setSlide вызывается 2 раза
        // всё потому что как аргумент в setSlide передается ссылка на состояние slide
        // и получается что setSlide как бы выполняет 2 раза одно и тоже к старому slide прибовляет новое значение 2 раза
        // обе эти команды возвращают одно и тоже не учитывая что надо отталкиваться от предыдущего стейта
        // setSlide(slide + i);
        // setSlide(slide + i);
    }

    function toggleAutoplay() {
        setAutoplay(autoplay => !autoplay);
    }



    // стейт можно сделать в качестве одной переменной как в клссовых компанентах но так больше кода 

    // const [state, setState] = useState({slide: 0, autoplay: false});

    // // в хук useState нужно передать начальное состояние нашего состояния внутри объекта
    // // в таком случае надо быть аккуратние потому чт овручную надо соблюдать принципы иммутабельности и обновлять состояние как объекта

    // function changeSlide(i) {
    //     // в таком случае мы должны возвращать из колбек функции новое состояние как объет
    //     // так как объект то в круглых скобках это замена return
    //     // в клссовых компанентах в setState указываем только одно свойтсво каторое хотим изменить и изменяется только оно одно
    //     // в хуках это работает подругому функция по обновлению состояния setState заменит именно тем значением что ему передано
    //     // она не объеденяет состояние она просто замещает 
    //     // setState(state => ({slide: state.slide + i})); // если так оставить то объект state потеряет свойство autoplay

    //     setState(state => ({...state, slide: state.slide + i}));
    //     // правильно использовать синтаксис диструктуризации и slide просто будет заменен на новое значение
    // }

    // function toggleAutoplay() {
    //     setState(state => ({...state, autoplay: !state.autoplay}));
    // }

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
  return (
        <Slider/>
  );
}

export default App;
