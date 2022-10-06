import {useState, useEffect , Component} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// Компоненты высшего порядка (HOC) 
// такой шаблон используется не только в реакте но и в других библиотеках или фреймворках

// Компонент высшего порядка (Higher-Order Component, HOC) — это один из продвинутых способов для повторного использования логики. 
// HOC не являются частью API React, но часто применяются из-за композиционной природы компонентов.
// Говоря просто, компонент высшего порядка — это функция, которая принимает компонент и возвращает новый компонент.

// это давольно слажная штука

// каждый компанент высшего порядка может работать поразному

// в JS функция может возвращать return другую функцию
// создадим функцию f катрая принимает в себя аргумент а и эта функция возвращает другую функцию каторая прининмает аргумет b и в итоге 
// 2 функция консолит сумму a + b
// что бы вызвать такую конструкцию можно прписать 2 вызыва f(1)(2);
// почему 2 вызыва f(1) это вызов первой функции  1 это a когда эта функция отрабаывает в своем итоге она возврощает 2 функцию
// тоесть как итог в первой части получаем еще одну функцию и если к этой функции добавим еще одни () это значит вызываем 2 функцию и передаим
// аргумент он пойдет как b
// срабатывает замыкание console.log(a + b); a находится в родительской функции

// const f = (a) => {
//     return (b) => {
//         console.log(a + b); // получаем 3
//     }
// }

// f(1)(2);

// классы это красивая обертка для функций конструктров тоесть таким же образом вместо функции внутри можно вернуть какой то безымянный класс
// и такая конструкция при взове f тоже будет работать функция возвращает класс а класс рендерит верстку

// const f = () => {
//     return class extends Component {
//         render() {
//             return <h1>Hello</h1>
//         }
//     }
// }

// на таком принципе строятся компаненты высшего порядка (HOC) хоки
// это функции каторые принимают компанент и возвращают новый компанент уже с модификациями
// например React.memo это компанент высшего порядка
// этот прием используется в приложениях для оптимизации работы или для добовления новых свойств компанентам с небольшим отличием
// если логика внутри одинаковая но на вход получают разные данные

// в этом файле как пример есть два компанента SliderFirst и SliderSecond они делают почти одно и тоже
// они с одинаковым состоянием, хук useEffect но немнго разная верстка в SliderFirst 2 кнопки в SliderSecond 3 кнопки
// отличие в функцях каторые вызывается в useEffect они имитируют запрос на сервер с получением разных данных устанавливают начальное состояние slide
// так как в компанентах очень похожий функционал его можно оптимизировать
// например это могут быть компаненты каторые рендарят немного разную верстку и при этом получают и разные данные
// один компанент может рендерить список товаров другой список пользователей причем это могут быть компаненты на разных частях фронтенда
// один компанент ля клиента рендерить список товаров а другой точно так же рендерить те же товары но только внутри административной понели
// но уже с небьшими дополнительными функциями
// и нужно вынести общую логику в одно место и при необходимости еще передавать и разные пропсы
// можно было бы передавать эти функции каторые имитируют запрос на сервер как пропсы и вызывать их внутри useEffect
// но так можно было бы сделать если бы была одинаковая верстка
// в библиотеке react-router есть тоже хок withRouter каторый позволяет получать доступ к некаторым объектам

// для эого создадим компанент высшего порядка withSlider с функциональными компанентами но с классовыми все точно так же работает
// принято все названия компанентов высшего порядка начинать с with тоесть с чем то каким то новым поведением 
// withSlider будет получать 2 аргумента 1 BaseCompanent - компанент каторый приходит 2 getData - функция каторая имитируют запрос на сервер
// при этом из withSlider сразу возвращается другая функция каторая принимает в себя пропсы тоесть это как бы функциональный компанент
// поместим повторяющуюся логику в компанент withSlider и функцию запроса на сервер меняем на getData
// и уже из этой функции возвращаем компанент <BaseCompanent/>
// а всю логику в компанентах SliderFirst и SliderSecond удаляем теперь в них все данные в верстке slide autoplay и тд. можно получать через пропсы
// теперь эти пропсы надо передать в компанент BaseCompanent каторый возвращается из withSlider
// но в функцию каторая возвращается из withSlider тоже приходят пропсы их тоже надо прокинуть в BaseCompanent
// для этого используем спрет оператор тоесть приходит props как объект и мы его разварачиваем уже как пропсы в BaseCompanent

// теперь что бы использовать withSlider
// удалаям вызов компанентов SliderFirst и SliderSecond из App
// что бы добавить каждому компаненту логику из withSlider нужно вызвать каждый компанент вместе с withSlider
// созадем переменную SliderWithFirstFetch в нее помещаем результат вызыва функции withSlider в каторую помещаем 1 аргументом компанент SliderFirst
// 2 аргументом функцию каторая делает запрос они отличаются в 2 компанентах
// const SliderWithFirstFetch = withSlider(SliderFirst, getDataFromFirstFetch); теперь есть новый компанент каторый содержит логику
// и его уже помещаем в App
// тоже самое со вторым компанентом
// теперь мы вынесли одинковую логику в отдельный компанент высшего порядка withSlider
// теперь если в App вызовам компанентов добовлять пропсы то их можно использовать напрямую внутри компанентов слайдеров console.log(props.name);

// таким образом можно не только выносить часть общей логики компанентов но и дбовлять к ним какую то дополнительную логику
// например
// создадим простой компанент Hello в нем может быть много интерфеса и логики не важно
// и допустим в какойто момент над к этому компаненту добавить дополнительное поведение не трогая его внутренности
// для этого тоже нужен компанент высшего порядка
// создадим компанент высшего порядка withLogger он будет принимать 1 аргумент WrappedCompanent
// и withLogger будет содержать useEffect катрый будет консолить 'first render' и возвращать компанент WrappedCompanent 
// каторому как пропсы передаем ...props
// теперь компанент каорый будет приходить в withLogger будет содержать этот useEffect
// так логику можно добавлять какую угодно

// такие компаненты высшего порядка не стоит применять:
// - пропсов каторые передаются в компанент каторый возвращается из хока слишком много, нет смысла, в идеале толко один пропс
// - когда каждый раз приходится изменять компанент высшего порядка когда подключается новый компанент тоже не стоит какй смысл

// стоит применять:
// - логика в хоке может подходить для многих других компанентов

const withSlider = (BaseCompanent, getData) => {
    return (props) => {
        const [slide, setSlide] = useState(0);
        const [autoplay, setAutoplay] = useState(false)

        useEffect(() => {
            setSlide(getData());
        }, [])

        function changeSlide(i) {
            setSlide(slide => slide + i);
        }

        return <BaseCompanent
                {...props} // разварачиваем пропсы из return (props) => {
                slide={slide} 
                autoplay={autoplay} 
                changeSlide={changeSlide} 
                setAutoplay={setAutoplay}/>
    }
}

const getDataFromFirstFetch = () => {return 10};
const getDataFromSecondFetch = () => {return 20};

// const SliderFirst = () => {
const SliderFirst = (props) => {
    // const [slide, setSlide] = useState(0);

    // useEffect(() => {
    //     setSlide(getDataFromFirstFetch());
    // }, [])

    // function changeSlide(i) {
    //     setSlide(slide => slide + i);
    // }

    console.log(props.name);

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {props.slide}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(1)}>+1</button>
                </div>
            </div>
        </Container>
    )
}

// const SliderSecond = () => {
const SliderSecond = (props) => {
    // const [slide, setSlide] = useState(0);
    // const [autoplay, setAutoplay] = useState(false)

    // useEffect(() => {
    //     setSlide(getDataFromSecondFetch());
    // }, [])

    // function changeSlide(i) {
    //     setSlide(slide => slide + i);
    // }

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {props.slide} <br/>{props.autoplay ? 'auto' : null} </div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.setAutoplay(autoplay => !props.autoplay)}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

const SliderWithFirstFetch = withSlider(SliderFirst, getDataFromFirstFetch);
const SliderWithSecondFetch = withSlider(SliderSecond, getDataFromSecondFetch);

const withLogger = WrappedCompanent => props => { // сокращенный синтаксис тоже самое что и в withSlider
    useEffect(() => {
        console.log('first render');
    }, [])

    return <WrappedCompanent {...props} />
}

const Hello = () => {
    return (
        <h1>Hello</h1>
    )
}

const HelloWithLogger = withLogger(Hello);

function App() {
    return (
        <>
            {/* <SliderFirst/>
            <SliderSecond/> */}
            {/* <Hello/> */}
            <HelloWithLogger/>
            <SliderWithFirstFetch name={'name'}/>
            <SliderWithSecondFetch/>
        </>
    );
}

export default App;
