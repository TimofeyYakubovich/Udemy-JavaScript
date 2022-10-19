import {useState} from 'react';
import {Container} from 'react-bootstrap';
import { Transition, CSSTransition } from 'react-transition-group';
import './App.css';

// React Transition Group библиотека для простых анимаций в реакте
// она позволяет делать планые переходы между чем то 
// эта библиотека для простых анимаций перехода основная функция библиотеки это отслеживание состояний появления или исчезновения элиментов

// в библиотеке есть 4 компанента Transition CSSTransition SwitchTransition TransitionGroup

// Transition это базовый компанент для работы с анимацией перехода не обезательно работает с CSS анимациями
// CSSTransition разработан для работы с анимациями через CSS классы

// оба компанента принимают в себя один дочернй компанент и у себя устанавливают 2 базовых свойства in и timeout
//  <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
// проп timeout - время анимации за каторое она произойдёт
// проп in - контралирует показывается компанент на странице или нет принимает в себя значение true (показан) или false (не показан)
// такой функционал позволяет отслеживать 4 стадии компанента Transition или CSSTransition и 6 событий

// проп in изночально стоит false тоесть компанент не показан когда переходит в true компанент показывается происходит 3 последовательных события
// onEnter начальная инициализация когда компанент появился
// onEntering средняя когда идет длительное действие сдесь мы ореинтируемся на проп timeout так как анимация происходит за какое то время
// onEntered когда элимент уже показан на странице
// когда элимент скрывается со страници in переходит из true в false и вызывается 3 последовательных события
// onExit инициализация скрытия коомпанента
// onExiting продолжительность анимации
// onExited компанент скрылся
// эти 6 событий можно отслеживать

// кроме этого есть еще 4 состояния entering entered exiting exited
// при появлении компанента in переходит из false в true происходит 2 состояния
// entering когда анмация производится
// entered конец
// при скрытии компанента in переходит из true в false происходит 2 состояния
// exiting когда анмация производится
// exited конец

// тоесть при появлении компанента in переходит из false в true дальше вызывается событие onEnter потом происходит состояние entering
// на нем вначале вызывается событие onEntering дальше можно вызывать custom function после вконце на состоянии entered можно вызвать событие onEntered

// что бы установить библиотеку npm install react-transition-group --save
// импортируем компанент Transition
// скопируем стили из документации

// поместим всю верстку в Modal в компанент Transition в функцию каторая принимает аргумент state
// в Transition передаем базовые пропсы timeout={duration} а in должен быть переключаемым и так как модалка появляется в зависмости от состояния
// showModal то обычно в in передается какой то стейт
// поэтому в App условный рендеринг уже не нужен теперь бибилиотека будет контралировать показывается компанент или нет
// Modal изначально будет скрыт потому что showModal изначально false useState(false);
// для этого в Modal передаем проп show={showModal}
// и в Transition в in передаем in={props.show}
// еще над дбавить главному диву модалки атрибут style это объект в катором разварачиваются дефолтные стили и промежуточные стили
// в transitionStyles[state] передаем аргумент state это то состояние на каором компанент сейчас нахдится его контролирует сама бибилиотека
// изменять это нельзя

// можно не только показывать и скрывать и тд. компаненты при помощи стилей с анимацией но и контралироать их рендеринг
// например пока модальное окно открыто его не будет существовать в дом дереве или наоборт когда оно закрыто что бы полностью исчезало из дом дерева
// что бы его нельзя было плучить для этого есть 2 пропа mountOnEnter unmountOnExit
// добовляем как проп unmountOnExit компаненту Transition и когда Modal закрыт его нет в дом дереве когда он открыт появляется в дом дереве

// можно вызывать 6 событий onEnter onEntering onEntered onExit onExiting onExited на каждом событии можно делать какое то действие
// например скрывать тот элимент кнопку каторый вызвал какое то действие или передавать какую то статистику и тд.
// реализуем функционал когда модальное окно открыто кнопка скрывается когда откырто кнопка появляется
// добовляем в Transition 2 пропа onEnter и onExited
// onEnter будет скрывать кнопку перед тем как будет стартавать анимация появления модалки
// onExited будет показывать кнопку когда анимация исчезнвения модалки уже закончилась
// в App добавим еще 1 состояние showTrigger что бы показывать и скрывать кнопку от условного рендеренга кнопка с Transition никак связана не будет
// setShowTrigger передаем в Modal как проп и в Transition в onEnter вызываем функцию и в ней в setShowTrigger передаем false
// и onExited в setShowTrigger передаем true
// таким образом в App состояние showTrigger будет изменяться и кнопка будет показываться и скрываться

const Modal = (props) => {

    const duration = 300; // продолжительность анимации

    const defaultStyle = { // объект с дефолтными стилями
        // transition: `opacity visibility ${duration}ms ease-in-out`, // transition устанавливает то что будет изменяться opacity за время duration
                                                         // ease-in-out тип анимации
        transition: `all ${duration}ms ease-in-out`,
        opacity: 0,
        visibility: 'hidden',
    }

    const transitionStyles = { // стили на переходных этапах
        entering: { opacity: 1, visibility: 'visible' }, // когда анимация фходит в свою фазу 
        entered:  { opacity: 1, visibility: 'visible' }, // когда анимация закончилась
        exiting:  { opacity: 0, visibility: 'hidden' },  // display не используем потому что его нельзя анмировать
        exited:  { opacity: 0, visibility: 'hidden' },
    };

    return (
        // <div className="modal mt-5 d-block">
        //     <div className="modal-dialog">
        //         <div className="modal-content">
        //         <div className="modal-header">
        //             <h5 className="modal-title">Typical modal window</h5>
        //             <button onClick={() => props.onClose(false)} type="button" className="btn-close" aria-label="Close"></button>
        //         </div>
        //         <div className="modal-body">
        //             <p>Modal body content</p>
        //         </div>
        //         <div className="modal-footer">
        //             <button onClick={() => props.onClose(false)} type="button" className="btn btn-secondary">Close</button>
        //             <button onClick={() => props.onClose(false)} type="button" className="btn btn-primary">Save changes</button>
        //         </div>
        //         </div>
        //     </div>
        // </div>
        <>
            <Transition 
                in={props.show} 
                timeout={duration}
                onEnter={() => props.setShowTrigger(false)}
                onExited={() => props.setShowTrigger(true)}>
                {state => (
                    <div className="modal mt-5 d-block" style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Typical modal window</h5>
                            <button onClick={() => props.onClose(false)} type="button" className="btn-close" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Modal body content</p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => props.onClose(false)} type="button" className="btn btn-secondary">Close</button>
                            <button onClick={() => props.onClose(false)} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
                )}
            </Transition>
        </>
        
    )
}

// CSSTransition делает тоже самое Transition только на основании CSS классов
// синтаксис немного другой 
// импорируем CSSTransition
// объекты со стилями defaultStyle transitionStyles уже не нужны и объект style как проп уже не нужен
// функция каторая рендерит верстку тоже не нужна
// вместо атрибута style используется проп classNames в него нужно прописать базовый класс modal от каторого все будут отталкиваться
// что бы CSSTransition нормально работал надо в файлике css прописать те классы каторые будут указывать на состояние этого компанента
// скопируем стили из документации

// в classNames можно переименовывать классы 

const ModalCSSTran = (props) => {

    const duration = 300; // продолжительность анимации

    return (
        <>
            <CSSTransition 
                in={props.show} 
                timeout={duration}
                onEnter={() => props.setShowTriggerCSSTran(false)}
                onExited={() => props.setShowTriggerCSSTran(true)}
                classNames="modal"
                mountOnEnter // mountOnEnter компанент будет создаваться в дом дереве только тогда когда будет вызван
                unmountOnExit> 
                {/* назначаем mountOnEnter unmountOnExit что бы классы не перебивали друг друга и не исчезала анимация при скрытии */}
                <div className="modal mt-5 d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Typical modal window CSSTransition</h5>
                            <button onClick={() => props.onClose(false)} type="button" className="btn-close" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Modal body content</p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => props.onClose(false)} type="button" className="btn btn-secondary">Close</button>
                            <button onClick={() => props.onClose(false)} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </>
        
    )
}

function App() {
    const [showModal, setShowModal] = useState(false);
    const [showTrigger, setShowTrigger] = useState(true);

    const [showModalCSSTran, setShowModalCSSTran] = useState(false);
    const [showTriggerCSSTran, setShowTriggerCSSTran] = useState(true);

    return (
        <Container>
            {/* {showModal ? <Modal onClose={setShowModal}/> : null} */}
            <Modal show={showModal} onClose={setShowModal} setShowTrigger={setShowTrigger}/>
            <ModalCSSTran show={showModalCSSTran} onClose={setShowModalCSSTran} setShowTriggerCSSTran={setShowTriggerCSSTran}/>
            {/* <button 
                type="button" 
                className="btn btn-warning mt-5"
                onClick={() => setShowModal(true)}>Open Modal</button> */}
            {showTrigger ?
            <button 
            type="button" 
            className="btn btn-warning mt-5"
            onClick={() => setShowModal(true)}>Open Modal</button> :
            null}

            {showTriggerCSSTran ?
            <button 
            type="button" 
            className="btn btn-warning mt-5 ms-5"
            onClick={() => setShowModalCSSTran(true)}>Open Modal CSSTran</button> :
            null}
        </Container>
    );
}

export default App;

// SwitchTransition и TransitionGroup позволяют модифицировать поведение двух базовых компанентов Transition и CSSTransition

// SwitchTransition обарачивает один из базовых компанентов и устанавивает режим рендеренга с помощью пропа mode
// у mode 2 значения
// 'out-in' компанент каторый должен появиться дожидается когда старый компанент уйдет со страници и потом вставляется в верстку
// 'in-out' старый компанент дожидается когда новый компанент вставится в верстку анимация завершилась и только тогда удаляется со страници 

// TransitionGroup оборачивает большое количество базовых компанентов
// например можно циклом при помощи map создавать различные CSSTransition особенность в том что у CSSTransition нет проперти in
// TransitionGroup сам отслеживает исчизновение или появление компанентов и приминения анимации к ним причем сам вид анимации определяет 
// конкретный CSSTransition
// в TransitionGroup есь состояние с массивом из объектов в которых прописаны id и text
// этот массив перебирается мепом и создает CSSTransition столько сколько объектов в массиве
// если состояние изменилось добавился или удалился объект то и добавился или удалился конкретный CSSTransition со своей анимацией
// проперти in не указывается так как используется состояние с массивом из объектов 


// анимации при помощт скриптов приминяются редко в показательных и дорогих проектах
// для сложных анимаций применяется библиотека react-motion 
