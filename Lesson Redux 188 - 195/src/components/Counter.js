import { Component } from "react";
// Lesson 194
import { connect } from "react-redux";
// теперь эотот компанент имеет доступ к стору так как в index.js использовался Provider
// импортируем функцию connect из react-redux это функция это компанент вычшего порядка HOC
// в данном случае функция connect это компанент вычшего порядка каторый обарачивает нужный нам компанент и в качестве пропсов передает ему 
// что то из стора
import { inc, dec, rnd } from "../actions";
// import * as actions from "../actions";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";

// Lesson 193
// const Counter = ({counter, inc, dec, rnd}) => {
const Counter = () => {

    const counter = useSelector(state => state.value); // useSelector всегда должен получать аргументом state
                                                       // что бы получить несколько значений из стейта можно использовать useSelector несколько раз
    // const counter = useSelector(state => state);    // useSelector вернет весь стейт как объект
    // const {value} = useSelector(state => state);       // можно использовать диструткуризацию

    const dispatch = useDispatch();

    return (
        <div className="jumbotron">
            <h1>{counter}</h1>
            {/* <h1>{counter.value}</h1> */}
            {/* <h1>{value}</h1> */}
            {/* <button onClick={dec} className="btn btn-primary">DEC</button> */}
            <button onClick={() => dispatch(dec())} className="btn btn-primary">DEC</button>
            {/* в onClick помещаем функцию что бы dispatch вызвался только тогда когда пользователь нажмет на кнопку */}
            {/* <button onClick={inc} className="btn btn-primary">INC</button> */}
            <button onClick={() => dispatch(inc())} className="btn btn-primary">INC</button>
            {/* <button onClick={rnd} className="btn btn-primary">RND</button> */}
            <button onClick={() => dispatch(rnd())} className="btn btn-primary">RND</button>
        </div>
    )

    // при использовании хуков использовать bindActionCreators особого смысла не имеет
    // там есть хук useAction но на прямую использовать dispatch(dec()) будет понятнее 
}

// class Counter extends Component {
//     render() {
//         const {counter, inc, dec, rnd} = this.props;
//         return (
//             <div className="jumbotron">
//                 <h1>{counter}</h1>
//                 <button onClick={dec} className="btn btn-primary">DEC</button>
//                 <button onClick={inc} className="btn btn-primary">INC</button>
//                 <button onClick={rnd} className="btn btn-primary">RND</button>
//             </div>
//         )
//     }
// }

// const mapStateToProps = (state) => { // state это глобальный стейт из стора
    // эта функция всегда должна возвращать объект с теми свойствами каторые надо вытащить из стейта для конкретного компанента
    // из стейта сейчас надо вытащить тольк один параметр counter в глобальном стейте это state.value
    // return {
    //     counter: state.value
    // }
    // если испльзуем эту функцию то ее надо передать как первый аргумент в функцию connect()
    // когда функция connect() запуститься она запустит mapStateToProps() она вернет объект и этот объект передастся на формировоние пропсов
    // в компаненте Counter

    // когда стейт будет обновляться каждый раз будет срабатывать функция connect()
    // если где то в какой то части приложения какой то компанент задиспатчил какое то действие
    // глобальный стейт поменялся и Provider говорит всем компанентам что что то был изменено
    // connect() от Provider плучает сигнал что то было изменено connect() запускается запускает mapStateToProps и если там значение поменялось
    // то компанент будет перерендерен

    // mapStateToProps должна быть чистой и синхронной функцией
    
    // еще она может принимать в себя еще один аргумент ownProps собственные пропсы и тогда клмпанент будет обновляться и тогда 
    // когда он будет получать новые пропсы
// }

// const mapDispatchToProps = (dispatch) => { // mapDispatchToProps принимает dispatch
    // используем bindActionCreators что бы обернуть каждый экшенкреэйтор обернуть в dispatch автоматически
    // const {inc, dec, rnd} = bindActionCreators(actions, dispatch);

    // return {                               // и возвращает объект 
        // inc: () => dispatch(inc({type: 'INC'})),  // что бы не прописывать каждый раз такой объект импортируем экшенкреэйторы
        // inc: () => dispatch(inc()),
        // inc, // после приминения bindActionCreators можно оставить просто inc тоже самое что и inc: inc
        // dec: () => dispatch(dec({type: 'DEC'})),
        // dec: () => dispatch(dec()),
        // dec,
        // rnd
        // rnd: () => {
        //     const value = Math.floor(Math.random() * 10);
        //     // dispatch(rnd(value));
        //     rnd(value);
        // }
        // поместим вычисление value в экшенкреэйторы и таким образом избавимся от value и сократить код
    // }

    // теперь bindActionCreators создает объект {inc, dec, rnd} и точно такой же объект возвращает return можно сократить запись
    // и вернуть return результат работы bindActionCreators она возвращает объект со всеми привязаными экшенкреэйторами к диспетчу
    // return bindActionCreators(actions, dispatch);

    // функция connect устроена так что если вместо mapDispatchToProps передать объект то она все экшенкреэйторы обернет в dispatch 
    // сама автоматически поэтому можно передать вторым аргументом просто объект с экшенкреэйторами actions 
    // а mapDispatchToProps вообще не создается
    // но иногда ее приходится создавать 

    // если испльзуем mapDispatchToProps то ее надо передать как второй аргумент в функцию connect()
// }

export default Counter;
// export default connect(mapStateToProps, mapDispatchToProps)(Counter); 
// export default connect(mapStateToProps, actions)(Counter); 

                                   // срзу будем экспортировать использование функции connect с обернутым в нее Counter
                                   // это значит будет запущена connect() выполнит какой то функционал и после этого этот функционал
                                   // будет применен к компаненту Counter
                                   // как итог этой конструкции connect()(Counter); получаем другой компанент каторый будет обернут в
                                   // дополнительный функционал 

// функция connect() принимает в себя несколько функций каторые буду настравивать наш компаннет
// function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)

// mapStateToProps функция каторая вытаскивает определенные пропсы из стейта и передает их в пропсы нужного компанента
// прописывается вручную каждый раз

// что бы передать сами функции inc, dec, rnd для этого используется функция mapDispatchToProps она создает действия и передает их как пропсы 
// компаненту

// у функции connect есть 3 и 4 аргументы mergeProps?, options? и они заточены на оптимизацию работы функции connect


// Lesson 195 

// селекторы в редаксе это функции каторые должны получить кусочек стора и передать его компаненту они должны быть чистыми и синхронными
// функция mapStateToProps является селектором

// хук useSelector аналог mapStateToProps 
// импортируем useSelector 

// mapStateToProps возвращала объект пропсов каторый соединялся с компанентом
// с useSelector создается переменная const counter = useSelector(state => state.value); и в useSelector прописываются какие свойстя 
// из стейта надо передать в переменную counter

// что бы добавить действия для кнопок используепм хук useDispatch он позволяет получить функцию Dispatch из стора
// const dispatch = useDispatch();
// экшенкреэйторы импортируем как отдельные переменные

// у этих хуков могут быть проблемы с оптимизацией так как они создаются и вызываются каждый раз при перерендеренге компанента

// чем отличается mapStateToProps от useSelector: 
// - useSelector может вернуть все что угодно а не только объект каторый потом идет на пропсы
// в колбек функции в useSelector можно делать что угодно но она должна быть чистой и синхронной 
// в counter уже может помещаться что угодна строка, функция, массив и тд.
// но в useSelector нет аргумента ownProps как в mapStateToProps для передачи собственных пропсов для отслеживания
// когда вызывается dispatch хук useSelector будет ссылочно будет проверять что если вот это значение не изменилось то и компанент не будет 
// перерендереваться
// это полезно если в глобольном стейте не поменялась ссылка на какой то массив или объект то компанент не будет перерендереваться

// новая ссылка создается тогда когда генерируем новый объект например {...state, value: state.value + 1} каждый раз когда создается новый объект
// как сдесь на него создается новая ссылка так же это применяется к внутренностям когда изменяется что то внутри каковота свойтсва

// разница в михонизмах сравнения когда мы хотим получить комбинированный объект из стора
// в mapStateToProps создается комбинированный объект каторый включает в себя какието свойства и их значения вытаскиваются из стейта
// и если что то в стейте менялось то mapStateToProps в этом объекте проверяет по отдельным полям а не по всему объекту 
// в хуке useSelector тоже можно создать такой объект 
// const counter = useSelector(state => {
//     return {
//         counter: state.value,
//         // и может быть еще несколько таких свойств и они могу приходить из разных частей стейта с большой вложенностью
//     }
// });
// и в таком случае хук будет сравнивать не по отдельным полям а по всему объекту тоесть у него идет строгое свравнение на то значение 
// каторое возвращается из колбек функции и любое изменение в любом кусочку стейта будет вызывать перерендеринг компанента так как создан новый
// объект это и есть проблема оптимизации при использовании хуков

// есть 3 решения этой проблемы
// 1 несколь раз использовать useSelector что бы отдельно получать каждое значение
// 2 использовать стороннию библиотеку reselect и вытаскивать из нее специальную функцию useSelector
// эта функция мемоизирует значение что бы можно было сразу получать один большой объект
// 3 добавить функцию shallowEqual каторая есть внутри react-redux и поместь ее втормы аргументов в хук useSelector тогда механизм сравнения
// поменяется


// useDispatch() 
// если какие то дейтвия надо передать ниже по иерархии компанентов то надо использовать useCallback
// для того что бы при перерендеренге родительского компанента не пересоздавался dispatch
// потому что если dispatch передается через проперти в какой то дочерний компанент то изменение dispatch будет вызывать
// перерендеринг дочернего компанента


// еще есть хук useStore он получает весь стор и уже как то используется в компаненте но используется очень редко

// есть так же проблема зомби дитей Zombie Children и протухших пропсов она может возникать при использовании хуков