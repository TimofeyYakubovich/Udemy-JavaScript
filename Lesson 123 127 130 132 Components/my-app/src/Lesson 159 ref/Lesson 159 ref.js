import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
// import './App.css';

class Form extends Component {
    // constructor(props) {
    //     super(props);
    //     this.myRef = React.createRef(); // что бы создать ссылку на какой то элимент используем метод createRef()
    //                                     // далее присваеваем инпоту реф ref={this.myRef}
    //                                     // теперь в свойстве myRef хрониться ссылка на элимент input уже в DOM дереве
    // }

    // myRef = React.createRef();

    // componentDidMount() {
    //     // что бы поставить фокус на инпут при создании компанента используем хук componentDidMount
    //     // componentDidMount вызывается после метода render это значит что верстка уже готова на странице и ссылка на инпут тоже
    //     // ссылка на элемент хрониться в специальном свойтве current про него часто забывают
    //     this.myRef.current.focus(); // Вызов метода focus() на DOM-элементе устанавливает фокус на этот элемент.
    //     // тут надо понимать что щас идёт работа напрямую с версткой тоесть с реальными элиментами в браузере и это
    //     // не совсем оптимизированно по сравнению со всей работай реакта где сначала все изменения проходят в виртуал DOM
    //     // именно поэту рекомендуется работать стандартными возможностями реакта
    //     // this.myRef.current.doSmth();
    // }

    setInputRef = elem => { // функция каторая создаёт новое свойство this.myRef и в него помещает ссылку на этот элимент
        this.myRef = elem;
    }

    focusFirstTI = () => {
        if (this.myRef) { // поместим в условие что бы проверить существование ссылки
            this.myRef.focus(); // если используем колбек то current не используем
        }
    }

    render() {
        return (
            <Container>
                <form className="w-50 border mt-5 p-3 m-auto">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        <input 
                        // ref={this.myRef} 
                        ref={this.setInputRef} 
                        // теперь при зоздании верстки вызовется эта функция и запишет в реф этот элимент на катором она была вызвана 
                        type="email" 
                        className="form-control" 
                        id="exampleFormControlInput1" 
                        placeholder="name@example.com"/>
                        {/* <TextInput ref={this.myRef}/> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                        <textarea onClick={this.focusFirstTI} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                </form>
                Обычно когда мы работаем с компанентами родительский компанент может взаимодействовать с дочерним через пропсы <br />
                (туда можно закидывать и данные и методы и стейт) и каждый раз когда пропсы изменяются компанент перересовываются <br />
                но если надо что то сделать с дочерним компанетам не перересовывая его например поставить или снять фокус, <br />
                узнать какой текст выделел пользователь вот в таких случаях понадабяться рефы. <br />
                Рефы используются не часто чаще всего используются в формах и работе с фокусом. <br />
                <br />
                Как сделать так что бы при загрузке этого компанента фокус сразу становился на инпут. <br />
                Реф - это ссылка на элемент или компанент в DOM дереве (элемент или компанент каторый уже есть в браузере) <br />
                <br />
                Рефы могут отличаться в зависимости от того на что повешен этот атрибут если на обычный элимент то получаем ссылку на этот <br />
                элимент, но рефы можно вешать и на компаненты например Container в таком случае свойство current будет получать <br />
                экземпляр созданного компанента таким образом можно вызывать методы этого компанента <br />
                если бы у контейнера был бы метод можно было бы ег вызвать так this.myRef.current.doSmth(); <br />
                Рефы назначаются перед componentDidMount и componentDidUpdate и когда компанент размантируется то в myRef запишется null <br />
                тоесть ненужно прописывать отписку от рефов как с обработчиками событий или таймаутами. <br />
                <br />
                Рефы нельзя назначать на функциональные компаненты. Потому что функциональные компаненты не могут создавать <br />
                экземпляры а классы могут <br />
                {/* <TextInput ref={this.myRef}/> */} вешаем реф на классовый компанент this.myRef.current.focus(); пытаемся утсановить <br />
                на него фокус и получае ошибку потому что используя реф на классовм компаненте получаем эклемпляр объекта <br />
                тоесть обычный объект, а на обычный объект объект нельзя использовать стандартный DOM API this.myRef.current.focus(); <br />
                тоесть нельзя бычный объект поставить в фокус, поэтому для таких манипуляций придётся прописать в компаненте отдельный <br />
                метод каторый будет устанавливать фокус на инпуте <br /> 
                Что бы не переписывать функциональный компанент в клссовый есть одна возможноть - это перенаправление рефов но <br />
                используется редко <br />
                создавать несколько рефов можно <br />
                <br />
                Еще есть колбек рефы это когда они создаются не при помощи createRef а при помощи функции  <br />
                и записываем ссылку на экземпляр класса <br />
            </Container>
        )
    }
}

// const TextInput = () => {
//     return (
//         <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
//     )
// }

class TextInput extends Component {

    doSmth = () => {
        console.log('smth');
    }

    render() {
        return (
            <input 
                type="email" 
                className="form-control" 
                id="exampleFormControlInput1" 
                placeholder="name@example.com"
            />
        )
    }
}

function AppLesson159() {
    return (
        <Form/>
    );
}

export default AppLesson159;
