import {useState, memo, PureComponent, Component, useCallback, createContext, useContext} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

import Form from './Form';
import dataContext from './context';

// Context в реакте не путать с ключевым словам this 

// 2 подхода к пострроению приложения

// 1 - использование одного общего состояния в главном файле и потом прокидование его методов для изменения этого состояния всё ниже по иерархии
// компанентов

// 2 - каждый компанент хранит свое личное состояние и меняет его внутри себя по надобности

// есть еще один подход когда есть одно общее состояние типа первого варианта но пр этом каждый компанент может с ним взаимодействовать без 
// целой кучи прокинутых пропсов с использованием контекста

// какой вариант использовать зависит от ситуации нужно ориентироваться на само приложение его сложность и какие действия оно совершает

// Context нужен для тго что бы данные передавать ниже по иерархии компанентов не используя пропсы

// пример когда главный компанент прокидывает ниже пропсы потом компанент лежащий в нем прокидываем эти пропсы еще ниже и так несколько раз
// и только компнент лежай глубоко внутри использует их такой шаблон называют антипатерным тесть тот габлон каторый не нужно использовать

// приминение контекста с классовыми и функциональными компанентами работает немного по разному
// основынми сущностями контекста являются команда createContext, Provider и Consumer
// импортруем createContext

// создадим контекст const dataContext = createContext() в переменную dataContext помещаем результат вызыва функции createContext()
// как единственный аргумент эта функция принимает в себя занчение поумолчанию помещаем туда объект из состояния data как начальное значение

// Provider это компанент каторый нужен для того что бы передать значение _currentValue (начальное значение каторые передали в функцию createContext())
// другим компанентам каторые находяться ниже по иерархии без пропсов

// Consumer это компанент каторый позволяет получить данные _currentValue он же отвечает и за изменения в контексте
// Provider и Consumer обычно выдергивают при помощи диструктуризации из контекста

// что бы использовать контекст используем Provider каторый предоставляет данные из какого то компанента
// поэтому в компаненте App помещаем все что в ретюрне в компанент Provider далее что бы передать те данные каторые доступны по иерархии ниже 
// используется проперти value  в него передаем значение каторое будет передовать этот Provider ниже в него передаем data
// если в value ничего не будет передано по какой то причине то Provider возьмет значение поумолчанию из createContext()

// далее при помощи Consumer можно получать эти данные ниже но при этом все потребиьели каторые являются потомками провайдера будут 
// повторно рендериться кактолько проп value у провайдера будет меняться
// в этом случае если меняется стейт в компаненте App то все компаненты катоыре испоьзуют данные из провайдера тоже будут перерендерены

// что бы использовать компанент Consumer в КЛАССОВОМ компаненте вся верстака в ретюрне помещается в компанент Consumer
// но в нем надо использовать функцию каторая получает один аргумент value тот value каторый передан в Provider и эта функция 
// возвращает return кусок верстки, остаётся из value вытащить свойство mail 
// таким образом мы прокинули mail из главного компанента App в компанент InputComponent каторый лежит через один
// и при нажатии кнпки Click me состояния в App изменилось Provider это отследсл и перерендерелся компанент InputComponent в инпуте value 
// изменилось на "second@example.com" и при этом пропсы не использовались

// еще 1 вариант использования контекста в КЛАССОВЫХ компанентах
// использование статичных свойст классов
// для класса можно назначить новое свойство каторое будет привязывать его к определенному контексту
// что бы назначить статичне свойство за пределами класса прописываем InputComponent.contextType = dataContext;
// свойство contextType привязывает к классу InputComponent контекст dataContext
// теперь внутри класса InputComponent есть свойство context из каторого вытаскиваем нужные свойства mail
// есть более современный способ назначение статичных свойст с помощью ключевого свойства static contextType = dataContext;


// в ФУНКЦИОНАЛЬНЫХ компанентах используется хук useContext() его задача вытаскивать значение из контекста
// импортруем useContext()
// const context = useContext(dataContext); когда хук запускается он должен принимать в себя тот контекст на каторый мы подписываемся
// в переменную context будет помещен объект название может быть любым
// достаем из context все свойства mail

// если компаненты находятся в разных файлах то используются приемы импорта экспорта
// разделим этот файл на 3 файла context.js, Input.js, Form.js
// и импортируем сюда только Form.js и context.js

// в приложении можно использовать больше одного контекста каждый будет довать доступ к свои данным по дкаждый создается Provider

// базовое использование контекста в реакте предпологает только получения значений из реакта но можно изменить это поведене
// добавим в компанент App функцию каторая будет изменять почту mail
// если в setData оставить так setData({mail: "name@example.com"}) то в data при следующем вызове setData исчезнит поле text
// нужно сначало использовать спрет оператор на предыдущес стейте а потом указать что меняется setData({...data, mail: "name@example.com"})
// добавим в состояние data ссылку на функцию forceChangeMail
// в Input.js добавим инпуту событие фокуса и в него пропишим функцию forceChangeMail
// теперь при нажатии на инпуте в нем меняется value с "name@example.com" на "test@example.com" функция forceChangeMail срабатывает
// и при нажатии Click me value меняется на "second@example.com" но при повторноом нажатии на инпут функция forceChangeMail не срабатывает
// потому что в App в событии клика на кнопке в setData не прописана функция и получается в состоянии data функции уже нет
// если его туда прописать все работает

// еще одна проблема сейчас в dataContext в значениях по умолчанию функции никой нет и если вдруг исчезнит value из провайдера
// значит берется начение по умолчанию но в Input.js в onFocus используем forceChangeMail то получаем ошибку context is undefined
// ошибка context is undefined когда используем провайдер без value то value установится в позицию undefined и всегда будет ошибка
// значения value установится по умолчанию когда провайдера полностью не будет <></>
// когда провайдера полностью нет все обернуто в <></> все рабтает и при нажатии на инпут просто ничего не происходит потому что в 
// onFocus прописана функция каторой просто не существует console.log(context.forceChangeMail); она undefined
// в каких то моментах это можеты вызвать проблемы лучше такие функции вносить в значения по умолчанию что бы она не была равна undefined

// когда передается контекст лучше не передавать в value прямых объектов например value={{something: 'something'}} это может привести к небльшим
// проблемам с оптимизацией потмоу что если вдруг провайдер заново перерендерится то в таком случае перерендерится все компаненты каторые на 
// этот контект подписаны потому что как бы заново создается новый объект {something: 'something'} каторый не равен предыдущему

// const dataContext = createContext({
//     mail: "name@example.com",
//     text: 'some text'
// })

// console.dir(dataContext);

// const {Provider, Consumer} = dataContext;
const {Provider} = dataContext;

// const Form = memo((props) => {
//     console.log('render');

//     return (
//         <Container>
//             <form className="w-50 border mt-5 p-3 m-auto">
//                 <div className="mb-3">
//                     <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
//                     {/* <InputComponent mail={props.mail}/> */}
//                     <InputComponent/>
//                     </div>
//                     <div className="mb-3">
//                     <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
//                     <textarea value={props.text} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
//                 </div>
//             </form>
//         </Container>
//     )
// });

// class InputComponent extends Component {

//     static contextType = dataContext;

//     render() {
//         // return(
//         //     <input value={this.props.mail} type="email" className='form-control' id="exampleFormControlInput1" placeholder="name@example.com"/>
//         // )
//         return(
//             // <Consumer>
//             //     {
//             //         value => {
//             //             return(
//             //                 <input 
//             //                     // value={this.props.mail} 
//             //                     value={value.mail}
//             //                     type="email" 
//             //                     className='form-control' 
//             //                     id="exampleFormControlInput1" 
//             //                     placeholder="name@example.com"/>
//             //             )
//             //         }
//             //     }
//             // </Consumer>
//             <input 
//                 // value={this.props.mail} 
//                 // value={value.mail}
//                 value={this.context.mail}
//                 type="email" 
//                 className='form-control' 
//                 id="exampleFormControlInput1" 
//                 placeholder="name@example.com"/>
//         )
//     }
// }

// InputComponent.contextType = dataContext;

// const InputComponent = () => {

//     const context = useContext(dataContext);

//     return (
//         <input
//             value={context.mail}
//             type="email" 
//             className='form-control' 
//             id="exampleFormControlInput1" 
//             placeholder="name@example.com"/>
//     )
// }

function App() {
    const [data, setData] = useState({
        mail: "name@example.com",
        text: 'some text',
        forceChangeMail: forceChangeMail
    });

    function forceChangeMail() {
        setData({...data, mail: "test@example.com"})
    }

    return (
        <Provider value={data}>
        {/* // <Provider> */}
        {/* // <> */}
            {/* <Form mail={data.mail} text={data.text}/> */}
            <Form text={data.text}/>
            <button 
                onClick={() => setData({
                    mail: "second@example.com",
                    text: 'another text',
                    forceChangeMail: forceChangeMail
                })}>
                Click me
            </button>
        {/* </> */}
        </Provider>
    );
}

export default App;
