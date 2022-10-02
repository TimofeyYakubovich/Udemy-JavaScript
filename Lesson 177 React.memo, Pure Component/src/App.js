import {useState, memo, PureComponent, Component, useCallback} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// React.memo — это компонент высшего порядка.

// Если ваш компонент всегда рендерит одно и то же при неменяющихся пропсах, вы можете обернуть его в вызов React.memo для повышения 
// производительности в некоторых случаях, мемоизируя тем самым результат. Это значит, что React будет использовать результат последнего рендера, 
// избегая повторного рендеринга.

// сейчас при перовом рендере компанента в консоль вдает render и при нажатии кнопки Click me поменялись данные в инпуте 
// и текстэрии и опять вдает render это нормально потому что изменилось состояние и компанент перерендерелся
// но если компанент каждый раз получает одинаковые пропсы то также при перовом рендере в консоль вдает render и при нажатии Click me
// опять вдает render это тоже нормально потому что объект с пропсами это уже другой объект хоть и с одинаковыми данными они не равны друг другу
// сравнение идет по ссылка а не по значениям
// в прилжениях могут быть компаннеты каторые каждый раз получают одинаковые пропсы и каждый раз буду безполезно перересовываться
// для этого и сущесвтует метод memo() он сохраняет компанент если у него не изменились значения пропсов тоесть позволяет избегать лишнего рендера
// и касается это только пропсов
// импортируем из реакта memo

// оборачиваем функцию в Form в memo
// теперь в консоль вдает render тоьлко при перовом рендере и при нажатии Click me ничего не происходит потому что пропсы пришли точно такие же как
// и первый раз если компанент Form будет даволно тяжелым это даст прирост скорости работы приложения
// но

// сравение пропсов идет поверхностное
// если бы свойство mail было объектом со свойством name причем одинаковым и в useState и в setData тоесть меняем на похожий объект
// в таком случае тоже в консоль вдает render при перовом рендере но при нажатии Click me опять вдает render потому что memo думает что это 
// уже другой пропс лежит внутри mail потому что сравение пропсов идет поверхностное
// но если мы уверены что в mail будут одинаковые свойтва можно написать свою функцию сравнения свойств для метода memo
// она должна принимать 2 аргмента prevProps nextProps предыдущие и новые пропсы и возвращать из сравнения пропсов true или false
// и если true то копанент перерендереваться не будет
// эту функцию помещаем 2 аргументом в метод memo() 
// сейчас при перовом рендере в консоль вдает render и при нажатии кнопки Click me ничего не происходит так как пропсы пришли точно такие же


// с классовыми компанентами свои особенности
// теоретически можно обенуть класс методом memo() и это может работать
// но разработчики не рекомендуют такое использование это не очень оптимизированно и может вызвать баги
// поэтому если надо сделать такую проверку с классовыми компанентами то необходимо использовать компанент PureComponent
// у компанента PureComponent есть встроеный метод shouldComponentUpdate() в остальном это обычный Componen
// импортируем PureComponent
// в таком случае если класс наследуется от PureComponent и него прихлдят постоянно одинаковые пропсы без объектов на первом уровне
// то консоль вдает render при перовом рендере но при нажатии Click me ничего не происходит так как пропсы пришли точно такие же
// это происходит потому что компанент PureComponent от каторого наследуется класс проводит операции сравнения просов самостоятельно 
// с помощью своего внутреннего метода shouldComponentUpdate() но только поверхностно

// но если в пропсы будут передаваться сложные вложенные структуры объекты, массивы и тд. поверхностное сравнение срабатывать не будет
// в таком случае нужно в методе shouldComponentUpdate() проописывать сравнение вручную но класс наследовать уже от обычного компанента Component
// shouldComponentUpdate() хук жизненного цикла
// shouldComponentUpdate(nextProps, nextState) может сравнивать приходящие и стейты и пропсы с предыдущими
// если пропсы совпадают возвращаем false и компанент не будет обнавлен всегда надо прописывать return true если условие не выполнилось
// в таком случае приходит пропсы как объекты и в консоль вдает render при перовом рендере но при нажатии Click me ничего не происходит 
// так как пропсы пришли точно такие же 

// в классовых компанентах можно сравнивать и пропсы и стейты причем и в Component с вложеннастями и в PureComponent на поверхностном уровне
// в функцинальных компанентах мемоизация при помощи memo работает только с пропсами
// что бы сравнивать стейты в функцинальных компанентах применяют прием передают стейты в качестве пропсов компанент в катором нужно проперять 
// стейты оборачивают в отделный компанент и в него стейты передают как пропсы и его уже оборачивают в memo()

// промежуточный итог
// 1 функция memo() используется для функциональных компанентов PureComponent или собственная реализация в классовых компанентах
// 2 применять такую мемоизацию стоит только на часто рендерещахся компанентах каторые получают одинаковые пропсы
// 3 ко всем подряд компанентам применять его не стоит использовать только на среднебльших по объему компанентах
// если рпименять memo() к компанентам каторые постоянно получают разные пропсы то получается добовляется дополнительно действие сравнение
// перед каждым рендером и приложение будет замедляться

// есть неочевиданя проблема когда пропсы приходят в качесвте функций, добавим как пропс функцию в функцинальный компанент а остальные пропсы 
// поверхностные без объетов
// в таком случае в консоль вдает render при перовом рендере но при нажатии Click me опять вдает render потому что memo() видит что пропсы пришли
// такие же но функция на самом деле это объект и каждый перерендер создается новая фунция тоесть для memo() это новый объект
// если переделать функцию на объявленный вариант в компаненте то всеравно при нажатии Click me опять вдает render
// что бы обойти эту проблему можно использвать хук useCallback теперь эта функция мемоизированна она будет изменяться только если изменится
// какое то значение в массиве зависимостей если в массиве ничего не будет то эта функция будет все время одна навсегда
// теперь при перовом рендере в консоль вдает render но при нажатии Click me ничего не происходит так как в проперти каждый раз одна и та же функция


// function propsCompare(prevProps, nextProps) {
//     return prevProps.mail.name === nextProps.mail.name && prevProps.text === nextProps.text;
// }

const Form = memo((props) => {
    console.log('render');

    return (
        <Container>
            <form className="w-50 border mt-5 p-3 m-auto">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
                    <input value={props.mail} type="email" className='form-control' id="exampleFormControlInput1" placeholder="name@example.com"/>
                    {/* <input value={props.mail.name} type="email" className='form-control' id="exampleFormControlInput1" placeholder="name@example.com"/> */}
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea value={props.text} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </form>
        </Container>
    )
// }, propsCompare);
});

// class Form extends PureComponent {
// class Form extends Component {

//     shouldComponentUpdate(nextProps) {
//         if (this.props.mail.name === nextProps.mail.name) {
//             return false;
//         } return true // синтаксис если условие не выполнилось то возвращаем true
//     }

//     render() {
//         console.log('render');
    
//         return (
//             <Container>
//                 <form className="w-50 border mt-5 p-3 m-auto">
//                     <div className="mb-3">
//                         <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
//                         {/* <input value={props.mail} type="email" className='form-control' id="exampleFormControlInput1" placeholder="name@example.com"/> */}
//                         <input value={this.props.mail.name} type="email" className='form-control' id="exampleFormControlInput1" placeholder="name@example.com"/>
//                         </div>
//                         <div className="mb-3">
//                         <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
//                         <textarea value={this.props.text} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
//                     </div>
//                 </form>
//             </Container>
//         )
//     }
// }

function App() {
    const [data, setData] = useState({
        mail: "name@example.com",
        // mail: {
        //     name: "name@example.com"
        // },
        text: 'some text'
    });

    const onLog = useCallback(() => {
        console.log('wow');
    }, []);

    return (
        <>
            {/* <Form mail={data.mail} text={data.text}/> */}
            {/* <Form mail={data.mail} text={data.text} onLog={() => console.log('wow')}/> */}
            <Form mail={data.mail} text={data.text} onLog={onLog}/>
            <button 
                onClick={() => setData({
                    // mail: "second@example.com",
                    // text: 'another text'
                    mail: "name@example.com",
                    // mail: {
                    //     name: "name@example.com"
                    // },
                    text: 'some text'
                })}>
                Click me
            </button>
        </>
    );
}

export default App;
