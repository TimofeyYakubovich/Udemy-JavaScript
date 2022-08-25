import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'react-bootstrap';
// import './App.css';

class Form extends Component {
    state ={
        advOpen: false
    }

    componentDidMount() {
        setTimeout(this.handleClick(), 3000);
        console.log('Mount');
    }

    handleClick = () => {
        // console.log('click');
        this.setState(({advOpen}) => ({
            advOpen: !advOpen
        }))
    }

    render() {
        return (
            <Container>
                В этой форме есть блок (сообщение) каторый абсолютно спозициониравон относительно формы и сдвинут в сторну и так как <br />
                у формы 'overflow': 'hidden' то он частично скрыт. Такую ситуацию часто можно встретить с модельными окнами или  <br />
                другими элиментами где есть обрезка контента и далеко не всегда можно что то сделать со стилями. <br />
                Нужно сделать так что это сообщение было видно когда оно будет вызвано из формы.  <br />
                Один из вариантов это что бы это структура рендарилась в другом место DOM дерева но не изменяя сруктуру дерева  <br />
                реакт-компанентов что бы потом не прописовать кучу логики сквозь компаненты. И этим как раз занимаются порталы. <br />
                Они позволяют отрендерить любые элименты в не своего родительского компанента в DOM структуре тоесть в верстке <br />
                самой страници. <br />
                <br />
                Тоесть этот блок (сообщение) каторый находится внутри компанента Form можно отрендерить где то в другом месте <br />
                но в реакте он останется внутри компанента <br />
                Для создания портала понадобится библиотека ReactDOM она служит что бы связывать реакт с DOM деревом <br />
                Вынесем этот блок (сообщение) в отделный компанент Msg, структуры формы не нарушим потомму что сюда же его вставим <br />
                только отдельным компанентом, при этом этот компанент может находиться вообще в другом файле просто сюда его импортировать <br />
                Обычно для порталов созадётся отдельный компанент отвечающий за этот функционал <br />
                <br />
                Компанент Portal рендерит на страницу props.children тоесть Компанент Msg в скамый конец DOM дерева в отдельном диве <br />
                при этом в самом реакте мы никак не мопеняли структуру <br />
                на счет стилей чаще всего требуется привязать элимент к какому то ориентиру на странице <br />
                теперь вот такой компанент Portal теперь можно модифицировать в зависимости от требований допустим сделать его классовым <br />
                и в componentDidMount выщитывать неоходимые параметры страници допустим <br />
                <br />
                Поведение обработчиков событий с порталами <br />
                назначим форме обработчик события onClick=this.handleClick <br />
                событие срабатывает и на форме и блоке (сообщение) хотя в версте этот элимент находится в скамый конец DOM дерева <br />
                событие которое сгенерированно изнутри портала будет рвспространяться к своему родителю в контексте реакта <br />
                <br />
                в родительском компаненте можно работать с внешним компанентом каторый отделился при помощи портала <br />
                пропишим условный рендеринг если advOpen true то рендерим портал если false то ничего не рендерим, 
                через 3 секунды будем вызывать handleClick

                <form onClick={this.handleClick} className="w-50 border mt-5 p-3 m-auto" 
                style={{'overflow': 'hidden', 
                        'position': 'relative'}}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        <input  type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    {/* <div 
                    style={{'width': '500px', 
                            'height': '150px', 
                            'backgroundColor': 'red', 
                            'position': 'absolute', 
                            'right': '-50%', 
                            'bottom': '-50%'}}>
                        Hello
                    </div> */}
                    {/* <Portal>
                        <Msg/>
                    </Portal> */}
                    {
                        this.state.advOpen ? 
                            <Portal>
                                <Msg/>
                            </Portal> : null
                    }
                </form>
            </Container>
        )
    }
}

const Portal = (props) => {
    const node = document.createElement('div')
    document.body.appendChild(node);
    // тоесть когда будет запускаться компанент Portal, сдесь мы будем взамодействовать напрямую со страницей в обход
    // виртуального DOM дерева

    return ReactDOM.createPortal(props.children, node); // createPortal команда для создания порталов принимает в себя 2 аргумента
    // 1 аргумент child дочерний элимент или компанент который нам надо куда то отрендерить
    // прописываем props.children отрендерит то что мы поместим внутрь компанента Portal

    // 2 аргумент тот контейнер куда мы хотим поместить этого ребенка
    // для 2 аргумента чаще всего создаютсяь отдельные элименты при помощи стандартного DOM API js и эти такие контейнеры будут
    // помещаться на страницу, а в этом контейнере уже будет наш нужный элимент (1 аргумент)
}

const Msg = () => {
    return (
        <div
            className='Msg' 
            style={{'width': '500px', 
                'height': '150px', 
                'backgroundColor': 'red', 
                'position': 'absolute', 
                'right': '-100px', 
                'bottom': '0'}}>
            Hello
        </div>
    )
}

function AppLesson160() {
    return (
        <Form/>
    );
}

export default AppLesson160;
